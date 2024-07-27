const bcrypt = require('bcrypt');

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
          beforeCreate: async (user) => {
              if (user.password) {
                  const salt = await bcrypt.genSalt(10);
                  user.password = await bcrypt.hash(user.password, salt);
              }
          }
      },
  });

  return User;
};
