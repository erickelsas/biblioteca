const authorService = require('../services/authorService');

exports.getAuthors = async (req, res) => {
  try {
    const {limit = 10, page = 1} = req.query;

    const validLimits = [5, 10, 30];
    if (!validLimits.includes(parseInt(limit))) {
        return res.status(400).json({ message: 'Limite inválido. Os valores permitidos são 5, 10 e 30.' });
    }

    if (page < 1) {
        return res.status(400).json({ message: 'Número da página deve ser maior ou igual a 1.' });
    }

    const authors = await authorService.getAuthors(parseInt(limit), parseInt(page));

    if (!authors || authors.length === 0) {
      return res.status(404).json({ message: 'Nenhum autor encontrado.' });
    }

    return res.status(200).json({ authors });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar autores.', error: error.message });
  }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Recebe todos os autores cadastrados'
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
        description: 'Envia todos os usuários encontrados',
        schema: [{ $ref: '#/components/schemas/Author' }]
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

exports.getAuthorById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null || id < 1){
            return res.status(400).json({ message: 'Id digitado inválido.' });
        }

        const author = await authorService.getAuthorById(id);

        if (!author || author === null){
            return res.status(404).json({ message: 'Nenhum autor encontrado.' });
        }

        return res.status(200).json({ author })
    } catch (error){
        return res.status(500).json({ message: 'Erro ao buscar autor.', error: error.message });
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Recebe um autor cadastrado, através do id'
        #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do autor',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Envia o autor encontrado',
        schema: { $ref: '#/components/schemas/Author' }
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
}

exports.createAuthor = async (req, res) => {
    try {
        const author = req.body;

        if (!author) {
            return res.status(400).json({ message: 'Não existe author enviado no body.' });
        }

        const authorWithId = await authorService.createAuthor(author);

        if (!authorWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o usuário.' });
        }

        return res.status(201).json({ author: authorWithId });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Cria um novo autor'
        #swagger.parameters['book'] = {
        in: 'body',
        description: 'Informações do autor',
        required: true,
        schema: {$ref: '#/components/schemas/Author'}
    }
    #swagger.responses[201] = {
        description: 'Cria um autor',
        schema: { $ref: '#/components/schemas/Author' }
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};


exports.deleteAuthor = async (req, res) => {
    try{
        const id = req.params.id


        if(!id || id < 1){
            return res.status(400).json({ message: 'Id inválido'})
        }

        const sucess = await authorService.deleteAuthor(id);

        if(sucess < 1){
            res.status(400).json({ message: 'Não foi possível deletar autor'});
        }

        return res.sendStatus(200);
    } catch (err){
        return res.status(500).json({ message: 'Erro ao deletar autor', error: err.message})
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Deleta um autor'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do autor',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Autor deletado com sucesso',
    }
    #swagger.responses[400] = {
        $ref: '#/components/responses/BadRequest'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
}
exports.updateAuthor = async (req, res) => {
    const authorId = req.params.id;
    const { name, biography } = req.body;

    try {
        const updatedAuthor = await authorService.updateAuthor(authorId, { name, biography });

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }

        return res.status(200).json({ author: updatedAuthor });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar autor', error: error.message });
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Atualiza um autor'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do autor',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Informações atualizadas do autor',
        required: true,
        schema: {$ref: '#/components/schemas/Author'}
    }
    #swagger.responses[200] = {
        description: 'Autor atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Author' }
    }
    #swagger.responses[404] = {
        $ref: '#/components/responses/NotFound'
    }
    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
};
