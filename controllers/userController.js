const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Nenhum usuário encontrado' });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null){
            return res.status(400).json({ message: 'Id digitado inválido' });
        }

        const user = await userService.getUserById(id);

        if (!user || user === null){
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }

        return res.status(200).json({ user })
    } catch (error){
        return res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = req.body;

        if (!user) {
            return res.status(400).json({ message: 'Não existe user enviado no body' });
        }

        const userWithId = await userService.createUser(user);

        if (!userWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o usuário' });
        }

        return res.status(201).json({ userWithId });
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try{
        const id = req.params.id


        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido'})
        }

        const sucess = await userService.deleteUser(id);

        if(sucess < 1){
            res.status(400).json({ message: 'Não foi possível deletar usuário'});
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso!'})
    } catch (err){
        return res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message})
    }
}