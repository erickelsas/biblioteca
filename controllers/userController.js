const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const {limit = 10, page = 1} = req.query;

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
    */
};

exports.getUserById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const user = await userService.getUserById(id);

        if (!user || user === null){
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }

        return res.status(200).json({ user })
    } catch (error){
        return res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Recebe um usuário cadastrado, através do id'
    */
}

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
    */
};


exports.deleteUser = async (req, res) => {
    try{
        const id = req.params.id


        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido.'})
        }

        const sucess = await userService.deleteUser(id);

        if(sucess < 1){
            res.status(400).json({ message: 'Não foi possível deletar usuário.'});
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso!'})
    } catch (err){
        return res.status(500).json({ message: 'Erro ao deletar usuário.', error: err.message})
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Deleta um usuário'
    */
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    let { isAdmin } = req.body

    const user = req.user;

    if(user.isAdmin === false && user.id != userId){
        return res.status(401).json({ message: 'Acesso negado.' });
    }

    if(!user.isAdmin){
        isAdmin = false;
    }

    try {
        const updatedUser = await userService.updateUser(userId, { name, email, password, isAdmin });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Atualiza um usuário'
    */
};