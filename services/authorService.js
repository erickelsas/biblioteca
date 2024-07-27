const { Author } = require('../model');


exports.getAuthors = async (limit = 10, page = 1) => {
  try {
    const validLimits = [5, 10, 30];
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }


    const offset = (page - 1) * limit;

    const authors = await Author.findAll({
      attributes: ['id', 'name', 'biography'],
      limit,
      offset,
    });

    return authors;
  } catch (error) {
    throw new Error('Erro ao buscar autores: ' + error.message);
  }
};

exports.getAuthorById = async (id) => {
  try {
    const author = await Author.findOne({
      attributes: ['id', 'name', 'biography'],
      where: { id },
    });
    return author;
  } catch (error) {
    throw new Error('Erro ao buscar autor: ' + error.message);
  }
};

exports.createAuthor = async ({ name, biography }) => {
    try {
        const author = await Author.create({
            name,
            biography
        })

        return author;
    } catch (error) {
        throw new Error('Erro ao criar autor: ' + error.message);
    }
}

exports.deleteAuthor = async (id) => {
    try{
        const length = await Author.destroy({ where: { id }})

        if(length === 0){
            throw new Error('Autor não encontrado.');
        }

        return length
    } catch(error){
        throw new Error('Erro ao deletar autor: ' + error.message);
    }
}

exports.updateAuthor = async (id, author) => {
    try {
        const [rowsUpdated] = await Author.update(author, {
            where: { id }
        });

        if (rowsUpdated === 0) {
            return null;
        }

        const updatedAuthor = await Author.findOne({
            where: { id }
        });

        return updatedAuthor;
    } catch (error) {
        throw new Error('Erro ao atualizar autor: ' + error);
    }
};
