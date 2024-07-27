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

Author.hasMany(Book, { foreignKey: 'authorId', onDelete: 'cascade' });
Book.belongsTo(Author, { foreignKey: 'authorId' });
User.hasMany(Loan, { foreignKey: 'userId', onDelete: 'cascade' });
Book.hasMany(Loan, { foreignKey: 'bookId', onDelete: 'cascade' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, User, Author, Book, Loan };