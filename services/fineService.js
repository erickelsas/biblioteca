const { Loan , User, Book, Fine, Author } = require('../model');

exports.getFines = async (limit = 10, page = 1, paid = true, userId = null) => {
    try{
        const validLimits = [5, 10, 30];

        if (!validLimits.includes(limit)) {
            throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
          }
          
        const offset = (page - 1) * limit;

        const baseQuery = {
            attributes: ['id', 'amount', 'paid', 'dueDate', 'paymentMethod'],
            include: [
                {
                    model: Loan,
                    as: 'loan',
                    attributes: ['id', 'loanDate', 'returnDate'],
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
                        }],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ],
            limit,
            offset
        };

        if(!paid){
            baseQuery.where = { paid: false }
        }

        if(userId){
            baseQuery.where = { userId }
        }

        if(!paid && userId){
            baseQuery.where = { paid: false, userId}
        }

        const fines = await Fine.findAll(baseQuery);

        return fines;
    } catch(err) {
        throw new Error('Erro ao buscar multas: ' + err.message);
    }
}

exports.getFineById = async (id) => {
    try{
        const fine = await Fine.findOne({
            attributes: ['id', 'amount', 'paid', 'dueDate', 'paymentMethod'],
            include: [
                {
                    model: Loan,
                    as: 'loan',
                    attributes: ['id', 'loanDate', 'returnDate'],
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
                        }],
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

        return fine;
    } catch (err) {
        throw new Error('Erro ao buscar multa')
    }
}

exports.createFine = async({ amount, paid, dueDate, payDate, paymentMethod, loanId, userId  }) => {
    try{
        const fine = await Fine.create({
            amount,
            paid,
            dueDate,
            payDate,
            paymentMethod,
            loanId,
            userId
        });

        const newFine = await this.getFineById(fine.id);
        return newFine
    } catch (err){
        throw new Error('Erro ao criar multa: ' + error.message)
    }
}

exports.deleteFine = async (id) => {
    try{
        const length = await Fine.destroy({ where: { id }});

        if(length === 0){
            throw new Error('Multa não encontrada.');
        }
    
        return length;
    } catch(err) {
        throw new Error('Erro ao deletar multa: ' + err.message)
    }
}

exports.updateFine = async (id, loan) => {
    try {
        const [rowsUpdated] = await Fine.update(fine, {
            where: { id }
        });
  
        if (rowsUpdated === 0) {
            return null;
        }
  
        const updatedFine = await this.getFineById(id);
  
        return updatedFine;
    } catch (err) {
        throw new Error('Erro ao atualizar empréstimo: ' + err.message);
    }
  };

exports.payFine = async(id, paymentMethod) => {
    try{
      const fine = await this.getFineById(id);

      if(fine.paid){
        throw new Error('Multa já foi paga, impossível pagar novamente.')
      }

      const [rowsUpdated] = await Fine.update({ paid: true, paymentMethod, payDate: new Date()}, { where: { id }})
    
      return rowsUpdated !== 0;
    } catch(err){
      throw new Error('Erro ao pagar multa: ' + err.message)
    }
  }