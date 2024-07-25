require('dotenv').config({ path: '../.env' });

const { DataTypes, Sequelize } = require('sequelize');

// Configuração do Sequelize para PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Alterado para PostgreSQL
    port: process.env.DB_PORT || 5432, // Porta padrão do PostgreSQL
    logging: console.log,
});

// Modelo User
const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Modelo Author
const AuthorModel = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Modelo Book
const BookModel = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            max: new Date().getFullYear(),
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorId: { 
        type: DataTypes.INTEGER,
        references: {
            model: AuthorModel,
            key: 'id',
        },
    },
});

// Modelo Loan
const LoanModel = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    loanDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: { // campo adicional para a associação
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
    bookId: { // campo adicional para a associação
        type: DataTypes.INTEGER,
        references: {
            model: BookModel,
            key: 'id',
        },
    },
});

// Definindo associações entre modelos
AuthorModel.hasMany(BookModel, { foreignKey: 'authorId' });
UserModel.hasMany(LoanModel, { foreignKey: 'userId' });
BookModel.hasMany(LoanModel, { foreignKey: 'bookId' });
BookModel.belongsTo(AuthorModel, { foreignKey: 'authorId' });
LoanModel.belongsTo(UserModel, { foreignKey: 'userId' });
LoanModel.belongsTo(BookModel, { foreignKey: 'bookId' });

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados e tabelas criados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
  });

module.exports = {
  UserModel,
  AuthorModel,
  BookModel,
  LoanModel,
  sequelize
};
