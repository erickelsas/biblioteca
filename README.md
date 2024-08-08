## Biblioteca

O projeto foi realizado para a matéria Web Back-End do 6º Período de Engenharia de Software na UTFPR-CP

#### Como rodar?

Para rodar, é necessário instalar uma ferramenta como o Postman ou Amnesia, para realizar as requisições.

Em segundo lugar, é necessário configurar as variáveis de ambiente na pasta `docker`, criando um arquivo chamado `.env` e colocando as variáveis disponíveis em `.env.example`

Em seguida, é necessário rodar o comando `npm run start` no terminal, com o caminho para a raiz da pasta.

Após isso, a primeira requisição deve ser realizada para `GET localhost:PORT/install`, para realizar a instalação das tabelas no banco de dados e a criação dos primeiros registros.

Agora o sistema já está utilizável e você pode ver as rotas disponíveis acessando `localhost:PORT/docs`.

Caso não tenha o Postgres instalado, existem um docker compose do Postgres 16 alpine no projeto, basta rodar o comando `docker compose up` na pasta `/docker` que, se o Docker estiver instalado, realizará a instalação.

### Usuários padrões

Existem alguns usuários padrões no sistema, são eles:
```
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
}
```

### Lógicas de negócio

Existem algumas lógicas de negócios implementadas, são elas:
- Devolução atrasada causa multa;
- Usuários com multa em aberto não podem realizar o empréstimo de novos livros;
- Existem rotas para devolução de empréstimos e pagamento de multas.
