const {beforeBulkCreateUser, beforeCreateUser} = require('../utils/hooks')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  }, {
    hooks: {
      beforeCreate: (user) => beforeCreateUser(user),
      beforeBulkCreate: (users) => beforeBulkCreateUser(users)
    },
  });

  return User;
};