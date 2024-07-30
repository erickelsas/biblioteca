const { User } = require('../model');

exports.getUsers = async (limit = 10, page = 1) => {
  try {
    const validLimits = [5, 10, 30];
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }

    const offset = (page - 1) * limit;

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'isAdmin'],
      limit,
      offset,
    });

    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'isAdmin'],
      where: { id },
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
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
}

exports.deleteUser = async (id) => {
    try{
        const length = await User.destroy({ where: { id }})

        if(length === 0){
            throw new Error('Usuário não encontrado.');
        }

        return length
    } catch(err){
        throw new Error('Erro ao deletar usuário: ' + err.message);
    }
}

exports.updateUser = async (id, user) => {
  try {
      const [rowsUpdated] = await User.update(user, {
          where: { id }
      });

      if (rowsUpdated === 0) {
          return null;
      }

      const updatedUser = await User.findOne({
          where: { id }
      });

      return updatedUser;
  } catch (err) {
      throw new Error('Erro ao atualizar usuário ' + err.message);
  }
};