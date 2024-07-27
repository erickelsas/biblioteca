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
    */
};

exports.getAuthorById = async (req, res) => {
    try{
        const id = req.params.id;

        if(id === null){
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

        return res.status(200).json({ message: 'Autor deletado com sucesso!'})
    } catch (err){
        return res.status(500).json({ message: 'Erro ao deletar autor', error: err.message})
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Deleta um autor'
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

        return res.status(200).json({ message: 'Autor atualizado com sucesso', author: updatedAuthor });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar autor', error: error.message });
    }

    /* 
    #swagger.tags = ['Authors']
    #swagger.summary = 'Atualiza um autor'
    */
};
