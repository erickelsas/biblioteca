const loanService = require('../services/loanService')

exports.getLoans = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const validLimits = [5, 10, 30];

        if (!validLimits.includes(parseInt(limit))) {
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if (page < 1) {
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const loans = await loanService.getLoans(limit, page);

        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: 'Nenhum empréstimo encontrado.' });
        }

        return res.status(200).json({ loans })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar empréstimos.', error: err.message })
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Recebe todos os empréstimos cadastrados'
    #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Número de itens por página',
        required: false,
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        required: false,
        type: 'integer'
    }
        #swagger.responses[200] = {
        description: 'Envia todos os empréstimos encontrados',
        schema: [{ $ref: '#/components/schemas/Loan' }]
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.getActiveLoans = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const validLimits = [5, 10, 30];

        if (!validLimits.includes(parseInt(limit))) {
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if (page < 1) {
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const loans = await loanService.getLoans(limit, page, false);

        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: 'Nenhum empréstimo encontrado.' });
        }

        return res.status(200).json({ loans })

    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar empréstimos.', error: err.message })
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Recebe todos os empréstimos cadastrados que estão ativos'
    #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Número de itens por página',
        required: false,
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        required: false,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Envia todos os empréstimos encontrados',
        schema: [{ $ref: '#/components/schemas/Loan' }]
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[401] = {
        $ref: '#/components/responses/Unauthorized'
    }
    #swagger.responses[403] = {
        $ref: '#/components/responses/Forbidden'
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.getLoanById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id === null || id < 1) {
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const loan = await loanService.getLoanById(id);

        if (!loan || loan === null) {
            return res.status(404).json({ message: 'Nenhum empréstimo encontrado.' });
        }

        return res.status(200).json({ loan })
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar empréstimo.', error: error.message });
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Recebe um empréstimo cadastrado através do id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do empréstimo',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Envia o emprétismo encontrado',
        schema: { $ref: '#/components/schemas/Loan' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.createLoan = async (req, res) => {
    try {
        const loan = req.body;

        if (!loan) {
            return res.status(400).json({ message: 'Não existe empréstimo enviado no body.' });
        }

        const loanWithId = await loanService.createLoan(loan);

        if (!loanWithId) {
            return res.status(400).json({ message: 'Não foi possível cadastrar o empréstimo.' });
        }

        return res.status(201).json({ loan: loanWithId });
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao criar empréstimo.', error: err.message });
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Cria um empréstimo'
    #swagger.parameters['loan'] = {
        in: 'body',
        description: 'Informações do empréstimo',
        required: true,
        schema: {$ref: '#/components/schemas/Loan'}
    }
        #swagger.responses[201] = {
        description: 'Empréstimo criado com sucesso',
        schema: { $ref: '#/components/schemas/Loan' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.updateLoan = async (req, res) => {
    const loanId = req.params.id;
    const { loanDate, dueDate, returnDate, returned, userId, bookId } = req.body;

    try {
        const updatedLoan = await loanService.updateLoan(loanId, { loanDate, dueDate, returnDate, returned, userId, bookId });

        if (!updatedLoan) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }

        return res.status(200).json({ message: 'Empréstimo atualizado com sucesso.', loan: updatedLoan });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar empréstimo.', error: error.message });
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Atualiza um empréstimo'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do empréstimo',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['loan'] = {
        in: 'body',
        description: 'Informações atualizadas do empréstimo',
        required: true,
        schema: { $ref: '#/components/schemas/Loan' }
    }
    #swagger.responses[200] = {
        description: 'Empréstimo atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Loan' }
    }
    #swagger.responses[404] = {
    $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.deleteLoan = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || id < 1) {
            return res.status(400).json({ message: 'Id inválido.' })
        }

        const success = await loanService.deleteLoan(id);

        if (success < 1) {
            res.status(400).json({ message: 'Não foi possível deletar empréstimo.' });
        }

        return res.status(200).json({ message: 'Empréstimo deletado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao deletar empréstimo.', error: err.message })
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Deleta um empréstimo'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do empréstimo',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Deletado com sucesso',
        schema: { "message":"Empréstimo deletado com sucesso"}
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.returnBook = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || id < 1) {
            return res.status(400).json({ message: 'Id inválido.' })
        }

        const success = await loanService.returnBook(id);

        if (success < 1) {
            res.status(400).json({ message: 'Não foi possível devolver o livro.' })
        }

        return res.status(200).json({ message: 'Livro devolvido com sucesso.' })
    } catch (err) {
        if(err.message.includes('Livro já foi devolvido, impossível remover novamente.')){
            return res.status(400).json({ message: err.message })
        }
        return res.status(500).json({ message: 'Erro ao devolver livro.', error: err.message })
    }

    /* 
    #swagger.tags = ['Loans']
    #swagger.summary = 'Devolve um livro'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do empréstimo',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Livro devolvido com sucesso',
        schema: { "message":"Livro devolvido com sucesso" }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}