const jwt = require('jsonwebtoken');
const { User } = require('../model');
const bcrypt = require('bcrypt')

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'});
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email }});

    if (user === null){
        return null;
    }

    return generateToken(user);
}