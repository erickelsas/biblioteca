## Biblioteca

O projeto foi realizado para a matéria Web Back-End do 6º Período de Engenharia de Software na UTFPR-CP

#### Como rodar?

Para rodar, é necessário instalar uma ferramenta como o Postman ou Amnesia, para realizar as requisições.

Em segundo lugar, é necessário configurar as variáveis de ambiente na pasta `docker`, criando um arquivo chamado `.env` e colocando as variáveis disponíveis em `.env.example`

Em seguida, é necessário rodar o comando `npm run start` no terminal, com o caminho para a raiz da pasta.

Após isso, a primeira requisição deve ser realizada para `GET localhost:PORT/install`, para realizar a instalação das tabelas no banco de dados e a criação dos primeiros registros.

Agora o sistema já está utilizável e você pode ver as rotas disponíveis acessando `localhost:PORT/docs`.

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