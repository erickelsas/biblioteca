const express = require('express');
const { sequelize, Book, Loan, User, Author, Fine } = require('../model');
const router = express.Router();


router.get('/install/', (req, res) => {
  const users = [
    {
        email: "admin@admin.com",
        name: "admin",
        password: "admin",
        isAdmin: true
    },
    {
        email: "user1@example.com",
        name: "Jane Smith",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user2@example.com",
        name: "Michael Lee",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user3@example.com",
        name: "Alice Johnson",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user4@example.com",
        name: "David Williams",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user5@example.com",
        name: "Emma Brown",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user6@example.com",
        name: "Liam Jones",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user7@example.com",
        name: "Olivia Garcia",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user8@example.com",
        name: "Ava Martinez",
        password: "1234",
        isAdmin: false
    },
    {
        email: "user9@example.com",
        name: "Sophia Rodriguez",
        password: "1234",
        isAdmin: false
    }
];

const authors = [
    { name: 'Aline Bei', biography: 'Aline Bei nasceu em São Paulo, em 1987. É formada em letras pela Pontifícia Universidade Católica de São Paulo e em artes cênicas pelo teatro-escola Célia Helena. Seu romance de estreia, O peso do pássaro morto (2017), foi vencedor do prêmio São Paulo de Literatura e do prêmio Toca, além de finalista do Prêmio Rio de Literatura. Pequena coreografia do adeus é seu segundo livro.'},
    { name: 'Carla Madeira', biography: 'Carla Madeira é uma escritora brasileira conhecida pelas obras Tudo é Rio, A Natureza da Mordida e Véspera. Carla Madeira também é jornalista e publicitária.'},
    { name: 'Natalia Timerman', biography: 'Nascida em São Paulo, Natalia Timerman é médica psiquiatra pela Unifesp, mestre em psicologia e doutoranda em literatura pela USP. Publicou DESTERROS: HISTÓRIAS DE UM HOSPITAL-PRISÃO (Elefante, 2017) e a coletânea de contos RACHADURAS (Quelônio, 2019), finalista do prêmio Jabuti. COPO VAZIO é seu primeiro romance.'},
    { name: 'Itamar Vieira Junior', biography: 'Itamar Vieira Junior é um escritor brasileiro. É autor do romance Torto Arado, ganhador do Prémio LeYa de 2018, do Prêmio Jabuti de 2020, do Prêmio Oceanos de 2020 e do Prêmio Montluc Rèsistance et Liberté de 2024.'},
    { name: 'Raphael Montes', biography: 'Raphael Montes é um escritor e roteirista brasileiro de literatura policial. Estima-se que, até janeiro de 2024, todos os seus livros juntos tenham vendido cerca de 500 mil cópias no Brasil e que a sua obra já tenha sido traduzida para 25 idiomas.'},
    { name: 'Djamila Ribeiro', biography: 'Djamila Ribeiro é uma filósofa, escritora e ativista brasileira. É conhecida por seus trabalhos na área de filosofia política e teoria feminista, bem como por seu ativismo em defesa dos direitos humanos e igualdade racial.'},
    { name: 'Conceição Evaristo', biography: 'Conceição Evaristo é uma escritora e ensaísta brasileira. Sua obra aborda temas como a discriminação racial, desigualdade social e a luta das mulheres negras.'},
    { name: 'André Vianco', biography: 'André Vianco é um escritor brasileiro de literatura fantástica, notório por seus romances que exploram o universo dos vampiros. Seus livros são conhecidos por misturar elementos de terror e suspense com a cultura brasileira.'},
    { name: 'Marçal Aquino', biography: 'Marçal Aquino é um escritor e roteirista brasileiro. Seus livros frequentemente exploram temas urbanos e relacionamentos complexos.'},
    { name: 'Ana Paula Maia', biography: 'Ana Paula Maia é uma escritora brasileira, conhecida por seus romances que exploram o cotidiano de personagens marginalizados e submundos urbanos.'}
];

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
    },
    {
        title: "O que é lugar de fala?",
        publicationYear: 2017,
        category: "Ensaios",
        isActive: true,
        quantity: 10,
        authorId: 6
    },
    {
        title: "Olhos d'água",
        publicationYear: 2014,
        category: "Contos",
        isActive: true,
        quantity: 12,
        authorId: 7
    },
    {
        title: "Os sete",
        publicationYear: 2000,
        category: "Terror",
        isActive: true,
        quantity: 20,
        authorId: 8
    },
    {
        title: "Eu receberia as piores notícias dos seus lindos lábios",
        publicationYear: 2005,
        category: "Romance",
        isActive: true,
        quantity: 14,
        authorId: 9
    },
    {
        title: "De gados e homens",
        publicationYear: 2013,
        category: "Drama",
        isActive: true,
        quantity: 11,
        authorId: 10
    }
];

const loans = [
    {
        userId: 2,
        bookId: 2,
        returned: true,
        returnDate: new Date('2024-08-09T00:00:00Z')
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
    },
    {
        userId: 6,
        bookId: 6,
        returned: true,
        returnDate: new Date('2024-08-01T00:00:00Z')
    },
    {
        userId: 7,
        bookId: 7
    },
    {
        userId: 8,
        bookId: 8,
        returned: true,
        returnDate: new Date('2024-08-05T00:00:00Z')
    },
    {
        userId: 9,
        bookId: 9,
        returned: true,
        returnDate: new Date('2024-08-07T00:00:00Z')
    },
    {
        userId: 10,
        bookId: 10,
        returned: true,
        returnDate: new Date('2024-08-06T00:00:00Z')
    }
];

const fines = [
    {
        amount: 10,
        dueDate: new Date('2024-08-12T00:00:00Z'),
        loanId: 1,
        userId: 1
    },
    {
        amount: 15,
        dueDate: new Date('2024-08-15T00:00:00Z'),
        loanId: 6,
        userId: 6
    },
    {
        amount: 20,
        dueDate: new Date('2024-08-20T00:00:00Z'),
        loanId: 8,
        userId: 8
    },
    {
        amount: 25,
        dueDate: new Date('2024-08-25T00:00:00Z'),
        loanId: 9,
        userId: 9
    },
    {
      amount: 12,
      dueDate: new Date('2024-08-18T00:00:00Z'),
      loanId: 10,
      userId: 10
  }];

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