const bcrypt = require('bcrypt');

exports.dueDateHook = (loan) => {
    const loanDate = loan.loanDate
    const devolucao = new Date();
    devolucao.setDate(loanDate.getDate() + 7);

    if (!loan.dueDate || loan.dueDate === null) {
      loan.dueDate = devolucao;
    }
  };

exports.bulkDueDateHook = (loans) => {
    loans.forEach(this.dueDateHook);
};

exports.dueDateFineHook = (fine) => {
  const fineDate = fine.startDate
  const diaMax = new Date();

  diaMax.setDate(fineDate.getDate() + 15);
}

exports.bulkDueDateFineHook = (fines) => {
  fines.forEach(this.dueDateFineHook);
}

exports.beforeCreateUser = async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  };

exports.beforeBulkCreateUser = async (users) => {
    await Promise.all(users.map(async (user) => {
        if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        }
    }));
}