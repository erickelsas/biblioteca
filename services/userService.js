const { User } = require('../model');

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'isAdmin'],
    });
    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'isAdmin'],
      where: { id }, // Certifique-se de usar um objeto para a condição
    });
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar usuário');
  }
};

exports.createUser = async ({ name, email, password, isAdmin = false }) => {
    try {
        const user = await User.create({
            name,
            email,
            password,
            isAdmin
        })

        return user;
    } catch (error) {
        throw new Error('Erro ao criar usuário');
    }
}

exports.deleteUser = async (id) => {
    try{
        const length = await User.destroy({ where: { id }})

        if(length === 0){
            throw new Error('Usuário não encontrado');
        }

        return length
    } catch(err){
        throw new Error('Erro ao deletar usuário');
    }
}