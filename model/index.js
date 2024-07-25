const { Sequelize } = require('sequelize');

const config = require('../config/config.js');
const UserModel = require('./user.js');
const AuthorModel = require('./author.js');
const BookModel = require('./book.js');
const LoanModel = require('./loan.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres', // Alterado para PostgreSQL
  port: config.port,
  logging: console.log,
});

// Inicializar modelos
const User = UserModel(sequelize, Sequelize.DataTypes);
const Author = AuthorModel(sequelize, Sequelize.DataTypes);
const Book = BookModel(sequelize, Sequelize.DataTypes);
const Loan = LoanModel(sequelize, Sequelize.DataTypes);

// Definir associações
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });
User.hasMany(Loan, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, User, Author, Book, Loan };
