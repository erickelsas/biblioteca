const { Loan ,Book, Author } = require('../model');

const { getBookById } = require('../services/bookService')


exports.getLoans = async (limit = 10, page = 1, returned = true) => {
  try {
    const validLimits = [5, 10, 30];
    
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }
    
    const offset = (page - 1) * limit;

    const loans = await Loan.findAll({
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
    });

    if(!returned){
        baseQuery.where = { returned }
    }
    
    return loans;
  } catch (error) {
    throw new Error('Erro ao buscar empréstimos: ' + error.message);
  }
};

exports.getLoanById = async (id) => {
  try {
    const loan = await Loan.findAll({
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

        const countAvaiableBooks = await Loan.count({ where: {
            bookId,
            returned: false
        }})

        if(book.quantity <= countAvaiableBooks){
            throw new Error(`Todos os livros ${book.title} já estão emprestados.`)
        }

        const hoje = new Date();
        const devolucao = new Date(hoje);
        devolucao.setDate(hoje.getDate() + diasEmprestados)

        const loan = await Loan.create({
            loanDate: hoje,
            returnDate: devolucao,
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
  try{
    const [rowsUpdated] = await Loan.update({ returned: true, dueDate: new Date()}, { where: { id }})
  
    return rowsUpdated !== 0;
  } catch(err){
    throw new Error('Erro ao devolver livro: ' + err.message)
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

      const updatedLoan = await Loan.findOne({
          where: { id }
      });

      return updatedLoan;
  } catch (err) {
      throw new Error('Erro ao atualizar empréstimo: ' + err.message);
  }
};