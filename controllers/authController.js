const authService = require('../services/authService');
const userService = require('../services/userService')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        
        if (token == null) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao tentar fazer login.', error: error.message });
    }

    /* 
    #swagger.tags = ['Login e registro']
    #swagger.summary = 'Realiza o login e retorna um token'
    */
}

exports.register = async (req, res) => {
    try {
        const user = req.body;

        if (!user) {
            return res.status(400).json({ message: 'Não existe user enviado no body.' });
        }

        const userWithId = await userService.createUser(user);

        if (!userWithId) {
            return res.status(400).json({ message: 'Não foi possível criar o usuário.' });
        }

        const { email, password } = req.body;
        const token = await authService.login(email, password);

        if (token == null) {
            return res.status(401).json({ message: 'Erro ao autenticar o novo usuário.' });
        }

        return res.status(201).json({ user: {id: userWithId.id, email: userWithId.email, isAdmin: userWithId.isAdmin}, token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }

    /* 
    #swagger.tags = ['Login e registro']
    #swagger.summary = 'Realiza o registro de um novo usuário e retorna o usuário e um token'
    */
}
