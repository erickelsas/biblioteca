const { Loan ,Book, Author, User } = require('../model');

const { getBookById } = require('../services/bookService')

const { createFine } = require('../services/fineService')


exports.getLoans = async (limit = 10, page = 1, returned = true) => {
  try {
    const validLimits = [5, 10, 30];
    
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }
    
    const offset = (page - 1) * limit;

    const baseQuery = {
        attributes: ['id', 'loanDate', 'dueDate', 'returnDate', 'returned'],
        include: [
            {
                model: Book,
                as: 'book',
                attributes: ['id', 'title', 'publicationYear', 'category', 'isActive', 'quantity'],
                include: [
                    {
                        model: Author,
                        as: 'author',
                        attributes: ['id', 'name', 'biography']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }
        ],
        limit,
        offset,
    };

    if(!returned){
        baseQuery.where = { returned: false };
    }

    const loans = await Loan.findAll(baseQuery);

    return loans;
  } catch (error) {
    throw new Error('Erro ao buscar empréstimos: ' + error.message);
  }
};

exports.getLoanById = async (id) => {
  try {
    const loan = await Loan.findOne({
        attributes: ['id', 'loanDate', 'dueDate', 'returnDate', 'returned'],
        include: [
            {
                model: Book,
                as: 'book',
                attributes: ['id', 'title', 'publicationYear', 'category', 'isActive', 'quantity'],
                include: [
                    {
                        model: Author,
                        as: 'author',
                        attributes: ['id', 'name', 'biography']
                    }
                ]
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }
        ],
        where: {
            id
        }
    });
    return loan;
  } catch (error) {
    throw new Error('Erro ao buscar empréstimo');
  }
};

exports.createLoan = async ({ userId, bookId, diasEmprestados = 7 }) => {
    try {
        const book = await getBookById(bookId);

        const livrosEmprestados = await Loan.count({ where: {
            bookId,
            returned: false
        }})

        if(book.quantity <= livrosEmprestados){
            throw new Error(`Todos os livros ${book.title} já estão emprestados.`)
        }

        const loan = await Loan.create({
            userId,
            bookId
        })

        const newLoan = await this.getLoanById(loan.id)
        return newLoan;
    } catch (error) {
        throw new Error('Erro ao criar empréstimo: ' + error.message);
    }
}

exports.deleteLoan = async (id) => {
    try{
        const length = await Loan.destroy({ where: { id }})

        if(length === 0){
            throw new Error('Empréstimo não encontrado.');
        }

        return length;
    } catch(err){
        throw new Error('Erro ao deletar empréstimo: ' + err.message);
    }
}

exports.returnBook = async(id) => {
    try {
        let fine;

        const loan = await this.getLoanById(id);
        
        if(!loan){
          throw new Error('ID incorreto.');
        }


        if (loan.returned) {
          throw new Error('Livro já foi devolvido, impossível remover novamente.');
        }
    
        const returnDate = new Date();
    
        const [rowsUpdated] = await Loan.update(
          { returned: true, returnDate },
          { where: { id } }
        );

        const loanDate = new Date(loan.loanDate);
    
        const dif = Math.abs(returnDate - loanDate);
        const diffDays = Math.ceil(dif / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          fine = await createFine({
            amount: (diffDays * process.env.VALOR_MULTA),
            loanId: loan.id,
            userId: loan.user.id
          });
        }
    
        return { rowsUpdated, fine };
      } catch (error) {
        throw new Error('Erro ao devolver livro: ' + error.message);
      }
}

exports.updateLoan = async (id, loan) => {
  try {
      const [rowsUpdated] = await Loan.update(loan, {
          where: { id }
      });

      if (rowsUpdated === 0) {
          return null;
      }

      const updatedLoan = await this.getLoanById(id);

      return updatedLoan;
  } catch (err) {
      throw new Error('Erro ao atualizar empréstimo: ' + err.message);
  }
};