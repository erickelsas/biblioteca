const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
  try {
    const {limit = 10, page = 1} = req.query;

    const validLimits = [5, 10, 30];
    if (!validLimits.includes(parseInt(limit))) {
        return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' });
    }

    if (page < 1) {
        return res.status(400).json({ message: 'Número da página deve ser maior ou igual a 1.' });
    }

    const books = await bookService.getBooks(parseInt(limit), parseInt(page), false);

    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'Nenhum autor encontrado.' });
    }

    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar livros.', error: error.message });
  }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Recebe todos os livros cadastrados'
    */
};

exports.getActiveBooks = async (req, res) => {
    try {
      const {limit = 10, page = 1} = req.query;
  
      const validLimits = [5, 10, 30];
      if (!validLimits.includes(parseInt(limit))) {
          return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' });
      }
  
      if (page < 1) {
          return res.status(400).json({ message: 'Número da página deve ser maior ou igual a 1.' });
      }
  
      const books = await bookService.getBooks(parseInt(limit), parseInt(page), true);
  
      if (!books || books.length === 0) {
        return res.status(404).json({ message: 'Nenhum livro encontrado.' });
      }
  
      return res.status(200).json({ books });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar livros.', error: error.message });
    }
  
      /* 
      #swagger.tags = ['Books']
      #swagger.summary = 'Recebe todos os livros cadastrados que estão ativos'
      */
  };