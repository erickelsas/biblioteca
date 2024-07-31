const dueDateHook = (loan) => {
  const hoje = new Date();
  const devolucao = new Date(hoje);
  devolucao.setDate(hoje.getDate() + 7);

  if (!loan.dueDate || loan.dueDate === null) {
    loan.dueDate = devolucao;
  }
};

const bulkDueDateHook = (loans) => {
  loans.forEach(dueDateHook);
};

module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: true,
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
      beforeBulkCreate: (loans) => bulkDueDateHook(loans),
      beforeCreate: (loan) => dueDateHook(loan)
    }
  });

  return Loan;
};
