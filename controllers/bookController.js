const bookService = require('../services/bookService');

exports.getBooks = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

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
        description: 'Envia todos os livros encontrados',
        schema: [{ $ref: '#/components/schemas/Book' }]
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

exports.getActiveBooks = async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query;

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
        description: 'Envia todos os livros ativos encontrados',
        schema: { $ref: '#/components/schemas/Book' }
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

exports.getBookById = async (req, res) => {
    try {
        const id = req.params.id;

        if(id === null || id < 1){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const book = await bookService.getBookById(id);

        if (!book || book === null){
            return res.status(404).json({ message: 'Nenhum livro encontrado.' });
        }

        return res.status(200).json({ book })
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar livro.', error: error.message });
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Recebe um livro cadastrado através do id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do livro',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Envia o livro encontrado',
        schema: { $ref: '#/components/schemas/Book' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

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
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Informações do livro',
        required: true,
        schema: {$ref: '#/components/schemas/Book'}
    }
    #swagger.responses[201] = {
        description: 'Livro criado com sucesso',
        schema: { $ref: '#/components/schemas/Book' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

exports.updateBook = async (req, res) => {
    const bookId = req.params.id;
    const { title, publicationYear, category, isActive, quantity, authorId } = req.body;

    try {
        const updatedBook = await bookService.updateBook(bookId, { title, publicationYear, category, isActive, quantity, authorId });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        return res.status(200).json({ book: updatedBook });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar livro.', error: error.message });
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Atualiza um livro'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do livro',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Informações atualizadas do livro',
        required: true,
        schema: {$ref: '#/components/schemas/Book'}
        }
    }
    #swagger.responses[200] = {
        description: 'Livro atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Book' }
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido.' })
        }

        const success = await bookService.inativeBook(id);

        if(!success){
            res.status(400).json({ message: 'Não foi possível inativar livro.' });
        }

        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao inativar livro.', error: err.message })
    }

    /* 
    #swagger.tags = ['Books']
    #swagger.summary = 'Torna um livro inativo'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do livro',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Livro inativado com sucesso',
        schema: { $ref: '#/components/schemas/Book' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};