const { Book, Author } = require('../model');


exports.getBooks = async (limit = 10, page = 1, isActive = false) => {
  try {
    const validLimits = [5, 10, 30];
    
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }
    
    const offset = (page - 1) * limit;
    
    const baseQuery = {
      attributes: ['id', 'title', 'publicationYear', 'category', 'isActive', 'quantity'],
      include: [
        {
          model: Author,
          as: 'author',
          attributes: ['id', 'name', 'biography']
        }
      ],
      limit,
      offset,
    };

    if (isActive) {
      baseQuery.where = { isActive: true };
    }


    const books = await Book.findAll(baseQuery);
    
    return books;
  } catch (error) {
    throw new Error('Erro ao buscar livros: ' + error.message);
  }
};

exports.getBookById = async (id) => {
  try {
    const book = await Book.findOne({
      attributes: ['id', 'title', 'publicationYear', 'category', 'isActive', 'quantity'],
      include: [
        {
          model: Author,
          as: 'author',
          required: true,
          attributes: ['id', 'name', 'biography']
        }
      ],
      where: {
        id
      }
    });
    return book;
  } catch (error) {
    throw new Error('Erro ao buscar livro');
  }
};

exports.createBook = async ({ title, publicationYear, category, isActive = true, quantity, authorId }) => {
    try {
        const book = await Book.create({
            title,
            publicationYear,
            category,
            isActive,
            quantity,
            authorId
        })

        const newBook = await this.getBookById(book.id)
        return newBook;
    } catch (error) {
        throw new Error('Erro ao criar livro: ' + error.message);
    }
}

exports.deleteBook = async (id) => {
    try{
        const length = await Book.destroy({ where: { id }})

        if(length === 0){
            throw new Error('Livro não encontrado.');
        }

        return length
    } catch(err){
        throw new Error('Erro ao deletar livro: ' + err.message);
    }
}

exports.inativeBook = async(id) => {
  try{
    const [rowsUpdated] = await Book.update({ isActive: false}, { where: { id }})
  
    return rowsUpdated !== 0;
  } catch(err){
    throw new Error('Erro ao inativar livro: ' + err.message)
  }
}

exports.updateBook = async (id, book) => {
  try {
      const [rowsUpdated] = await Book.update(book, {
          where: { id }
      });

      if (rowsUpdated === 0) {
          return null;
      }

      const updatedBook = await Book.findOne({
          where: { id }
      });

      return updatedBook;
  } catch (err) {
      throw new Error('Erro ao atualizar livro: ' + err.message);
  }
};