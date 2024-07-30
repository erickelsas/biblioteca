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
      return res.status(404).json({ message: 'Nenhum livro encontrado.' });
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

  exports.getBookById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const book = await bookService.getBookById(id);

        if (!book || book === null){
            return res.status(404).json({ message: 'Nenhum livro encontrado.' });
        }

        return res.status(200).json({ book })
    } catch (error){
        return res.status(500).json({ message: 'Erro ao buscar livro.', error: error.message });
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Recebe um livro cadastrado através do id'
    */
}

exports.createBook = async (req, res) => {
    try {
        const book = req.body;

        if (!book) {
            return res.status(400).json({ message: 'Não existe livro enviado no body.' });
        }

        const bookWithId = await bookService.createBook(book);

        if (!bookWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o livro.' });
        }

        return res.status(201).json({ book: bookWithId });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar livro.', error: error.message });
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Cria um novo livro'
    */
};


exports.deleteBook = async (req, res) => {
    try{
        const id = req.params.id


        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido.'})
        }

        const sucess = await bookService.inativeBook(id);

        if(!sucess){
            res.status(400).json({ message: 'Não foi possível inativar usuário.'});
        }

        return res.status(200).json({ message: 'Livro inativado com sucesso!'})
    } catch (err){
        return res.status(500).json({ message: 'Erro ao inativar usuário.', error: err.message})
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Torna um livro inativo'
    */
}

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, publicationYear, category, isActive, quantity, authorId } = req.body;

  try {
      const updatedBook = await bookService.updateBook(bookId, { title, publicationYear, category, isActive, quantity, authorId });

      if (!updatedBook) {
          return res.status(404).json({ message: 'Livro não encontrado.' });
      }

      return res.status(200).json({ message: 'Livro atualizado com sucesso.', book: updatedBook });
  } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar livro.', error: error.message });
  }

  /* 
  #swagger.tags = ['Books']
  #swagger.summary = 'Atualiza um livro'
  */
};