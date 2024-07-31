const config = require('./config/config');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const bodyParser = require('body-parser');

const { authorRoutes, authRoutes, userRoutes, bookRoutes, loanRoutes, installRoute } = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use(installRoute)
app.use(authRoutes);
app.use(userRoutes);
app.use(authorRoutes);
app.use(bookRoutes);
app.use(loanRoutes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})