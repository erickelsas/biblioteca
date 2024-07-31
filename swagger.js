const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'REST API - Biblioteca',
    description: 'API REST de uma Biblioteca, feita para a matéria de Web Back-End'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'Rotas relativas a usuários'
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
  components: {
    schemas: {
      Author: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          name: {
            type: 'string',
            example: 'J.K. Rowling'
          },
          biography: {
            type: 'string',
            example: 'Biography of the author.'
          }
        },
        required: ['name']
      },
      Book: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          title: {
            type: 'string',
            example: "Harry Potter and the Philosopher's Stone"
          },
          publicationYear: {
            type: 'integer',
            format: 'int32',
            example: 1997
          },
          category: {
            type: 'string',
            example: 'Fantasy'
          },
          isActive: {
            type: 'boolean',
            example: true
          },
          quantity: {
            type: 'integer',
            format: 'int32',
            example: 10
          },
          authorId: {
            type: 'integer',
            format: 'int64',
            example: 1
          }
        },
        required: ['title', 'category', 'quantity']
      },
      Loan: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          loanDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-07-30T00:00:00Z'
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-30T00:00:00Z'
          },
          returnDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-08-25T00:00:00Z'
          },
          returned: {
            type: 'boolean',
            example: false
          },
          userId: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          bookId: {
            type: 'integer',
            format: 'int64',
            example: 1
          }
        },
        required: ['loanDate', 'dueDate', 'userId', 'bookId']
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1
          },
          email: {
            type: 'string',
            example: 'user@example.com'
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          password: {
            type: 'string',
            example: 'hashedpassword'
          },
          isAdmin: {
            type: 'boolean',
            example: false
          }
        },
        required: ['email', 'name', 'password']
      }
    },
    responses: {
      BadRequest: {
        description: 'Erro de requisição',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Erro de requisição'
                }
              }
            }
          }
        }
      },
      Unauthorized: {
        description: 'Acesso não autorizado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Acesso não autorizado'
                }
              }
            }
          }
        }
      },
      Forbidden: {
        description: 'Token inválido',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Token inválido'
                }
              }
            }
          }
        }
      },
      NotFound: {
        description: 'Nenhum dado encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Nenhum dado encontrado'
                }
              }
            }
          }
        }
      },
      InternalServerError: {
        description: 'Erro interno',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Erro interno'
                },
                error: {
                  type: 'string',
                  example: 'Mensagem de erro'
                }
              }
            }
          }
        }
      }
    }
  }
};


const outputFile = './swagger-output.json';

const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server');
});
