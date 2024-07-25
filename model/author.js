module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
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
  
    return Author;
  };
  