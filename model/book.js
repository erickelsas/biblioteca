module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
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
          model: 'Authors',
          key: 'id',
        },
      },
    });
  
    return Book;
  };
  