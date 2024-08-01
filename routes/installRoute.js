const express = require('express');
const { sequelize, Book, Loan, User, Author, Fine } = require('../model');
const router = express.Router();


router.get('/install/', (req, res) => {
    const users = [
        {
          id: 1,
          email: "admin@admin.com",
          name: "admin",
          password: "admin",
          isAdmin: true
        },
        {
          id: 2,
          email: "user1@example.com",
          name: "Jane Smith",
          password: "1234",
          isAdmin: false
        },
        {
          id: 3,
          email: "user2@example.com",
          name: "Michael Lee",
          password: "1234",
          isAdmin: false
        },
        {
          id: 4,
          email: "user3@example.com",
          name: "Alice Johnson",
          password: "1234",
          isAdmin: false
        },
        {
          id: 5,
          email: "user4@example.com",
          name: "David Williams",
          password: "1234",
          isAdmin: false
        }
      ];

    const authors = [
        { name: 'Aline Bei', biography: 'Aline Bei nasceu em São Paulo, em 1987. É formada em letras pela Pontifícia Universidade Católica de São Paulo e em artes cênicas pelo teatro-escola Célia Helena. Seu romance de estreia, O peso do pássaro morto (2017), foi vencedor do prêmio São Paulo de Literatura e do prêmio Toca, além de finalista do Prêmio Rio de Literatura. Pequena coreografia do adeus é seu segundo livro.'},
        { name: 'Carla Madeira', biography: 'Carla Madeira é uma escritora brasileira conhecida pelas obras Tudo é Rio, A Natureza da Mordida e Véspera. Carla Madeira também é jornalista e publicitária.'},
        { name: 'Natalia Timerman', biography: 'Nascida em São Paulo, Natalia Timerman é médica psiquiatra pela Unifesp, mestre em psicologia e doutoranda em literatura pela USP. Publicou DESTERROS: HISTÓRIAS DE UM HOSPITAL-PRISÃO (Elefante, 2017) e a coletânea de contos RACHADURAS (Quelônio, 2019), finalista do prêmio Jabuti. COPO VAZIO é seu primeiro romance.'},
        { name: 'Itamar Vieira Junior', biography: 'Itamar Vieira Junior é um escritor brasileiro. É autor do romance Torto Arado, ganhador do Prémio LeYa de 2018, do Prêmio Jabuti de 2020, do Prêmio Oceanos de 2020 e do Prêmio Montluc Rèsistance et Liberté de 2024.'},
        { name: 'Raphael Montes', biography: 'Raphael Montes é um escritor e roteirista brasileiro de literatura policial. Estima-se que, até janeiro de 2024, todos os seus livros juntos tenham vendido cerca de 500 mil cópias no Brasil e que a sua obra já tenha sido traduzida para 25 idiomas.'}
    ]

    const books = [
        {
          title: "Pequena coreografia do Adeus",
          publicationYear: 2021,
          category: "Ficção",
          isActive: true,
          quantity: 15,
          authorId: 1
        },
        {
          title: "Tudo é rio",
          publicationYear: 2014,
          category: "Romance",
          isActive: true,
          quantity: 20,
          authorId: 2
        },
        {
          title: "Copo vazio",
          publicationYear: 2021,
          category: "Terror", 
          isActive: true,
          quantity: 18,
          authorId: 3
        },
        {
          title: "Torto Arado",
          publicationYear: 2019,
          category: "Ficção",
          isActive: true,
          quantity: 25,
          authorId: 4
        },
        {
          title: "Bom dia verônica",
          publicationYear: 2022,
          category: "Mistério",
          isActive: true,
          quantity: 30,
          authorId: 5
        }
      ];

      const loans = [
        {
          userId: 1,
          bookId: 2,
          returned: true,
          returnDate: new Date('09/08/2024')
        },
        {
          userId: 3,
          bookId: 4
        },
        {
          userId: 2,
          bookId: 1
        },
        {
          userId: 4,
          bookId: 3
        },
        {
          userId: 5,
          bookId: 5
        }
      ];

      const fines = [
        {
          amount: 10,
          dueDate: new Date('12/08/2024'),
          loanId: 1,
          userId: 1
        }
      ]

    sequelize.sync({ force: false })
    .then(async () => {
    console.log('Banco de dados e tabelas criados!');

    try{
        await User.bulkCreate(users, {validate: true});
        console.log("Usuários foram adicionados!");

        await Author.bulkCreate(authors, {validate: true});
        console.log("Autores foram adicionados!");

        await Book.bulkCreate(books, {validate: true});
        console.log("Livros foram adicionados!");

        await Loan.bulkCreate(loans, {validate: true});
        console.log("Empréstimos foram adicionados!");

        await Fine.bulkCreate(fines, {validate: true});
        console.log("Multas foram adicionadas!");
        
        return res.status(201).json({ message: 'Instalado com sucesso!'})
    } catch (error){
        console.log(error.message)
    }
    })
    .catch((err) => {
    console.error('Erro ao sincronizar com o banco de dados:', err);

    return res.status(500).json({ message: 'Houve um erro ao instalar, tente novamente.'})
    });

    /*
    #swagger.tags = ['Install']
    #swagger.summary = 'Instala o banco de dados e cria os primeiros registros'
   
    #swagger.responses[201] = {
        description: 'Banco de dados instalado com sucesso',
        schema: { "message":'Instalado com sucesso!' }
    }

    #swagger.responses[500] = {
        $ref: '#/components/responses/InternalServerError'
    }
    */
});

module.exports = router;