const { Sequelize } = require('sequelize');

const config = require('../config/config.js');
const UserModel = require('./user.js');
const AuthorModel = require('./author.js');
const BookModel = require('./book.js');
const LoanModel = require('./loan.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: config.port,
  logging: console.log,
});

const User = UserModel(sequelize, Sequelize.DataTypes);
const Author = AuthorModel(sequelize, Sequelize.DataTypes);
const Book = BookModel(sequelize, Sequelize.DataTypes);
const Loan = LoanModel(sequelize, Sequelize.DataTypes);

Author.hasMany(Book, { foreignKey: 'authorId', onDelete: 'cascade', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Loan, { foreignKey: 'userId', onDelete: 'cascade', as: 'loans' });
Book.hasMany(Loan, { foreignKey: 'bookId', onDelete: 'cascade', as: 'loans' });
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'loanedBook' });

module.exports = { sequelize, User, Author, Book, Loan };