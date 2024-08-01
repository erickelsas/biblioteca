const { Sequelize } = require('sequelize');

const config = require('../config/config.js');
const UserModel = require('./user.js');
const AuthorModel = require('./author.js');
const BookModel = require('./book.js');
const LoanModel = require('./loan.js');
const FineModel = require('./fine.js')

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
const Fine = FineModel(sequelize, Sequelize.DataTypes);

Author.hasMany(Book, { foreignKey: 'authorId', onDelete: 'cascade', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Loan, { foreignKey: 'userId', onDelete: 'cascade', as: 'loans' });
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Book.hasMany(Loan, { foreignKey: 'bookId', onDelete: 'cascade', as: 'loans' });
Loan.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

User.hasMany(Fine, { foreignKey: 'userId', onDelete: 'cascade', as: 'fines' });
Fine.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Loan.hasOne(Fine, { foreignKey: 'loanId', onDelete: 'cascade', as: 'fine' });
Fine.belongsTo(Loan, { foreignKey: 'loanId', as: 'loan' });

module.exports = { sequelize, User, Author, Book, Loan, Fine };