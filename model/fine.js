const { dueDateFineHook, bulkDueDateFineHook } = require("../utils/hooks");

module.exports = (sequelize, DataTypes) => {
    const Fine = sequelize.define('Fine', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startDate: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      payDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      paymentMethod: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            min: 1,
            max: 6
        }
      },
      loanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Loans',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    }, {
      beforeCreate: dueDateFineHook,
      beforeBulkCreate: bulkDueDateFineHook
    });
  
    return Fine;
  };
  