const { Book, Author } = require('../model');


exports.getBooks = async (limit = 10, page = 1, isActive = false) => {
  try {
    const validLimits = [5, 10, 30];
    if (!validLimits.includes(limit)) {
      throw new Error('Limite inválido. Os valores permitidos são 5, 10 e 30.');
    }
    
    const offset = (page - 1) * limit;
    
    let books;
    
    const baseQuery = {
        attributes: ['id', 'title', 'publicationYear', 'category', 'isActive', 'quantity'],
        include: [
          {
            model: Author,
            as: 'author',
            required: true,
            attributes: ['id', 'name', 'biography']
          }
        ],
        limit,
        offset,
      };
    
    if (isActive) {
      baseQuery.where = { isActive };
    }
    
    books = await Book.findAll(baseQuery);
    
    return books;
  } catch (error) {
    throw new Error('Erro ao buscar livros: ' + error.message);
  }
};