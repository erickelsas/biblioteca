const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido!' });
        }

        req.user = user;
        next();
    });
};

exports.authenticateAdmin = (req, res, next) => {
    const user = req.user;

    if (!user.isAdmin) {
        return res.status(401).json({ message: 'Acesso negado' });
    }

    next();
};

exports.admin = (req, res, next) => {
    this.authenticateToken(req, res, (err) => {
        if (err) {
            return;
        }
        this.authenticateAdmin(req, res, next);
    });
};
