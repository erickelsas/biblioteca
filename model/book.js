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
    isActive: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Authors',
        key: 'id',
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['title', 'authorId']
      }
    ]
  });

  return Book;
};