const { sequelize } = require('./model');

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados e tabelas criados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
  });
