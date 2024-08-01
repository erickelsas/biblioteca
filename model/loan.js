const { dueDateHook, bulkDueDateHook} = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
  }, {
    hooks: {
      beforeBulkCreate: (loans) => {bulkDueDateHook(loans)},
      beforeCreate: (loan) => {dueDateHook(loan)}
    }
  });

  return Loan;
};
