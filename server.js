const config = require('./config/config')
const { sequelize } = require('./model');

const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')

const { authenticateToken} = require('./utils/authMiddleware');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados e tabelas criados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})