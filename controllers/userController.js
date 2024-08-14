const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const validLimits = [5, 10, 30];
        if (!validLimits.includes(parseInt(limit))) {
            return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' });
        }
    
        if (page < 1) {
            return res.status(400).json({ message: 'Número da página deve ser maior ou igual a 1.' });
        }

        const users = await userService.getUsers(parseInt(limit), parseInt(page));

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Recebe todos os usuários cadastrados'
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
        description: 'Envia todos os usuários encontrados',
        schema: [{ $ref: '#/components/schemas/User' }]
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
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id === null || id < 1) {
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const user = await userService.getUserById(id);

        if (!user || user === null) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Recebe um usuário cadastrado, através do id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Envia todos os usuário encontrado',
        schema: { $ref: '#/components/schemas/User' }
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
};

exports.createUser = async (req, res) => {
    try {
        const user = req.body;

        if (!user) {
            return res.status(400).json({ message: 'Não existe user enviado no body.' });
        }

        const userWithId = await userService.createUser(user);

        if (!userWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o usuário.' });
        }

        return res.status(201).json({ user: userWithId });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Cria um novo usuário'
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'Informações do usuário',
        required: true,
        schema: {$ref: '#/components/schemas/User'}
    }
    #swagger.responses[201] = {
        description: 'Usuário criado com sucesso',
        schema: { $ref: '#/components/schemas/User' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || id < 1) {
            return res.status(400).json({ message: 'Id inválido.' });
        }

        const success = await userService.deleteUser(id);

        if (success < 1) {
            res.status(400).json({ message: 'Não foi possível deletar usuário.' });
        }

        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao deletar usuário.', error: err.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Deleta um usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Usuário deletado com sucesso',
        schema: { "message":"Usuário deletado com sucesso!" }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    let { isAdmin } = req.body;

    const user = req.user;

    if (user.isAdmin === false && user.id != userId) {
        return res.status(401).json({ message: 'Acesso negado.' });
    }

    if (!user.isAdmin) {
        isAdmin = false;
    }

    try {
        const updatedUser = await userService.updateUser(userId, { name, email, password, isAdmin });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Atualiza um usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'Informações atualizadas do usuário',
        required: true,
        schema: { $ref: '#/components/schemas/User' }
        }
    }
    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso',
        schema: { $ref: '#/components/schemas/User' }
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
};