const bcrypt = require('bcrypt');

exports.dueDateHook = (loan) => {
    const hoje = new Date();
    const devolucao = new Date(hoje);
    devolucao.setDate(hoje.getDate() + 7);
  
    if (!loan.dueDate || loan.dueDate === null) {
      loan.dueDate = devolucao;
    }
  };

exports.bulkDueDateHook = (loans) => {
    loans.forEach(dueDateHook);
};

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