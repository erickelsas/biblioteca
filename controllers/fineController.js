const fineService = require('../services/fineService')

exports.getFines = async (req, res) => {
    try{
        const { limit = 10, page = 1} = req.query;

        const validLimits = [5, 10, 30];

        if(!validLimits.includes(parseInt(limit))){
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if(page < 1){
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const fines = await fineService.getFines(limit, page);

        if(!fines || fines.length === 0){
            return res.status(404).json({ message: 'Nenhuma multa encontrado.' });
        }

        return res.status(200).json({ fines })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar multas.', error: err.message});
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Recebe todos as multas cadastradas'
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
        description: 'Envia todos as multas encontrados',
        schema: [{ $ref: '#/components/schemas/Fine' }]
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

exports.getNotPaidFines = async (req, res) => {
    try{
        const { limit = 10, page = 1} = req.query;

        const validLimits = [5, 10, 30];

        if(!validLimits.includes(parseInt(limit))){
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if(page < 1){
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const fines = await fineService.getFines(limit, page, false);

        if(!fines || fines.length === 0){
            return res.status(404).json({ message: 'Nenhuma multa encontrado.' });
        }

        return res.status(200).json({ fines })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar multas.', error: err.message});
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Recebe todos as multas cadastradas que não foram pagas'
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
        description: 'Envia todos as multas encontrados',
        schema: [{ $ref: '#/components/schemas/Fine' }]
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

exports.getFineById = async (req, res) => {
    try{
        const id = req.params.id;

        const fine = await fineService.getFineById(id);

        if(!fine){
            return res.status(404).json({ message: 'Nenhuma multa encontrado.' });
        }

        return res.status(200).json({ fine })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar multas.', error: err.message});
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Recebe todos as multas cadastradas que não foram pagas'
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
        description: 'Envia a multa com ID solicitado',
        schema: { $ref: '#/components/schemas/Fine' }
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

exports.getFinesByUserId = async (req, res) => {
    try{
        const userId = req.params.userId;

        const { limit = 10, page = 1} = req.query;

        const validLimits = [5, 10, 30];

        if(!validLimits.includes(parseInt(limit))){
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if(page < 1){
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const fines = await fineService.getFines(limit, page, false, userId);

        if(!fines || fines.length === 0){
            return res.status(404).json({ message: 'Nenhuma multa encontrado.' });
        }

        return res.status(200).json({ fines })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar multas.', error: err.message});
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Recebe todos as multas cadastradas de um usuário'
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
        description: 'Envia todos as multas encontrados',
        schema: [{ $ref: '#/components/schemas/Fine' }]
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

exports.getNotPaidFinesByUserId = async (req, res) => {
    try{
        const userId = req.params.userId;

        const { limit = 10, page = 1} = req.query;

        const validLimits = [5, 10, 30];

        if(!validLimits.includes(parseInt(limit))){
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' })
        }

        if(page < 1){
            return res.status(400).json({ message: 'Número de página deve ser maior ou igual a 1.' })
        }

        const fines = await fineService.getFines(limit, page, false, userId);

        if(!fines || fines.length === 0){
            return res.status(404).json({ message: 'Nenhuma multa encontrado.' });
        }

        return res.status(200).json({ fines })
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar multas.', error: err.message});
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Recebe todos as multas cadastradas de um usuário'
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
        description: 'Envia todos as multas encontrados',
        schema: [{ $ref: '#/components/schemas/Fine' }]
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

exports.createfine = async(req, res) => {
    try{
        const fine = req.body;

        if(!fine){
            return res.status(400).json({ message: 'Não existe multa enviada no body.' });
        }

        const fineWithId = await fineService.createFine(fine);

        if(!fineWithId){
            return res.status(400).json({ message: 'Não foi possível cadastrar a multa.' });
        }

        return res.status(201).json({ loan: loanWithId });
    } catch(err){
        return res.status(500).json({ message: 'Erro ao criar multa.', error: err.message });
    }
    
    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Cria uma multa'
    #swagger.parameters['loan'] = {
        in: 'body',
        description: 'Informações do empréstimo',
        required: true,
        schema: {$ref: '#/components/schemas/Fine'}
    }
        #swagger.responses[201] = {
        description: 'Empréstimo criado com sucesso',
        schema: { $ref: '#/components/schemas/Fine' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.deleteFine = async (req, res) => {
    try{
        const id = req.params.id;

        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido.'});
        }
    
        const sucess = await fineService.deleteFine(id);
    
        if (sucess < 1){
            res.status(400).json({ message: 'Não foi possível deletar multa.' });
        }
    
        return res.status(200).json({ message: 'Multa deletada com sucesso!' })
    } catch (err){
        return res.status(500).json({ message: 'Erro ao deletar multa.', error: err.message})
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Deleta uma multa'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da multa',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Deletado com sucesso',
        schema: { "message":"Multa deletada com sucesso"}
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.updateFine = async (req, res) => {
    const id = req.params.id;
    const { amount, paid, dueDate, payDate, paymentMethod, loanId, userId } = req.body;

    try {
        const updatedFine = await fineService.updateService(id, { amount, paid, dueDate, payDate, paymentMethod, loanId, userId });

        if (!updatedFine) {
            return res.status(404).json({ message: 'Multa não encontrada.' });
        }

        return res.status(200).json({ message: 'Multa atualizada com sucesso.', loan: updatedFine });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar multa.', error: error.message });
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Atualiza uma multa'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do multa',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['loan'] = {
        in: 'body',
        description: 'Informações atualizadas do multa',
        required: true,
        schema: { $ref: '#/components/schemas/Loan' }
    }
    #swagger.responses[200] = {
        description: 'Multa atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Fine' }
    }
    #swagger.responses[404] = {
    $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}

exports.payFine = async (req, res) => {
    try {
        const id = req.params.id;

        const { paymentMethod } = req.body;

        if (!id || id < 1) {
            return res.status(400).json({ message: 'Id inválido.' })
        }

        if( !paymentMethod ){
            return res.status(400).json({ message: 'Era esperado um método de pagamento vindo no body.'})
        }

        const success = await fineService.payFine(id, paymentMethod);

        if (success < 1) {
            res.status(400).json({ message: 'Não foi possível paga a multa.' })
        }

        return res.status(200).json({ message: 'Multa paga com sucesso.' })
    } catch (err) {
        if(err.message.includes('Multa já foi paga, impossível pagar novamente.')){
            return res.status(400).json({ message: err.message})
        }
        return res.status(500).json({ message: 'Erro ao pagar multa.', error: err.message })
    }

    /* 
    #swagger.tags = ['Fines']
    #swagger.summary = 'Paga uma multa'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da multa',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['paymentMethod'] = {
        in: 'body',
        description: 'Método de pagamento',
        required: true,
        schema: { "paymentMethod":1}
    }
    #swagger.responses[200] = {
        description: 'Multa paga com sucesso',
        schema: { "message":"Multa paga com sucesso" }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}