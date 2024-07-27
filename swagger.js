const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      version: '1.0.0',            // by default: '1.0.0'
      title: 'REST API - Biblioteca',              // by default: 'REST API'
      description: 'API REST de uma Biblioteca, feita para a matéria de Web Back-End'         // by default: ''
    },
    host: 'localhost:3000',                 // by default: 'localhost:3000'
    basePath: '/',             // by default: '/'
    schemes: ['http'],              // by default: ['http']
    consumes: ['application/json'],             // by default: ['application/json']
    produces: ['application/json'],             // by default: ['application/json']
    tags: [                   // by default: empty Array
      {
        name: 'Users',             // Tag name
        description: 'Rotas relativas a usuários'       // Tag description
      },
      {
        name: 'Authors',
        description: 'Rotas relativas a autores'
      },
      {
        name: 'Login e registro',
        description: 'Rotas relativas a autentificação'
      }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {}           // by default: empty object
  };

const outputFile = './swagger-output.json';

const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server');
})