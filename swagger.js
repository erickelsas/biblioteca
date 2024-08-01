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
      name: 'Install',
      description: 'Rota que realiza a instalação do banco de dados e cria os primeiros registros'
    },
    {
      name: 'Login e registro',
      description: 'Rotas relativas a autentificação'
    },
    {
      name: 'Users',
      description: 'Rotas relativas a usuários'
    },
    {
      name: 'Authors',
      description: 'Rotas relativas a autores'
    },
    {
      name: 'Books',
      description: 'Rotas relativas a livros'
    },
    {
      name: 'Loans',
      description: 'Rotas relativas a empréstimos'
    },
    {
      name: 'Fines',
      description: 'Rotas relativas a multas'
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
      },
      "Fine": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "amount": {
            "type": "string",
            "format": "decimal",
            "example": "10.00"
          },
          "paid": {
            "type": "boolean",
            "example": false
          },
          "dueDate": {
            "type": "string",
            "format": "date-time",
            "example": "2024-12-08T03:00:00.000Z"
          },
          "paymentMethod": {
            "type": "string",
            "nullable": true,
            "example": null
          },
          "loan": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "loanDate": {
                "type": "string",
                "format": "date-time",
                "example": "2024-08-01T01:10:30.952Z"
              },
              "returnDate": {
                "type": "string",
                "format": "date-time",
                "example": "2024-09-08T03:00:00.000Z"
              },
              "book": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer",
                    "example": 2
                  },
                  "title": {
                    "type": "string",
                    "example": "Tudo é rio"
                  },
                  "publicationYear": {
                    "type": "integer",
                    "example": 2014
                  },
                  "category": {
                    "type": "string",
                    "example": "Romance"
                  },
                  "isActive": {
                    "type": "boolean",
                    "example": true
                  },
                  "quantity": {
                    "type": "integer",
                    "example": 20
                  },
                  "author": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer",
                        "example": 2
                      },
                      "name": {
                        "type": "string",
                        "example": "Carla Madeira"
                      },
                      "biography": {
                        "type": "string",
                        "example": "Carla Madeira é uma escritora brasileira conhecida pelas obras Tudo é Rio, A Natureza da Mordida e Véspera. Carla Madeira também é jornalista e publicitária."
                      }
                    }
                  }
                }
              }
            }
          },
          "user": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "example": 1
              },
              "name": {
                "type": "string",
                "example": "admin"
              },
              "email": {
                "type": "string",
                "example": "admin@admin.com"
              }
            }
          }
        },
      },
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
