const config = require('./config/config');

const { sequelize } = require('./model');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const bodyParser = require('body-parser');

const { authorRoutes, authRoutes, userRoutes, bookRoutes, loanRoutes } = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(authorRoutes);
app.use(bookRoutes);
app.use(loanRoutes)

sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados e tabelas criados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar com o banco de dados:', err);
  });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})