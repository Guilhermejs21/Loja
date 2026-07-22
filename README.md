# Loja Full Stack

Projeto de uma loja virtual desenvolvido para praticar o desenvolvimento de aplicações web utilizando uma API em ASP.NET Core e um frontend desenvolvido com HTML, CSS e JavaScript.

## Sobre o projeto

A aplicação consiste em uma loja virtual onde os produtos são armazenados em um banco de dados e disponibilizados através de uma API.

O frontend consome essa API e permite que o usuário visualize os produtos e gerencie seu carrinho de compras.

## Tecnologias utilizadas

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger

### Frontend

- HTML5
- CSS3
- JavaScript

## Funcionalidades

### Produtos

- Listagem de produtos
- Busca de produto por ID
- Cadastro de produtos
- Atualização de produtos
- Exclusão de produtos

### Carrinho

- Adicionar produtos ao carrinho
- Controlar a quantidade de produtos
- Remover uma unidade do produto
- Remover completamente o produto quando a quantidade chega a zero
- Calcular o subtotal de cada produto
- Calcular o valor total do carrinho
- Exibir a quantidade total de itens no indicador do carrinho

## Estrutura do projeto

```text
Loja
│
├── BackEnd
│   │
│   └── loja.api
│       │
│       ├── Controllers
│       │   └── ProdutosController.cs
│       │
│       ├── Data
│       │   └── AppDbContext.cs
│       │
│       ├── Models
│       │   └── Produto.cs
│       │
│       ├── Migrations
│       │
│       ├── appsettings.json
│       │
│       └── Program.cs
│
└── FrontEnd
    │
    ├── index.html
    ├── carrinho.html
    │
    ├── css
    │   └── global.css
    │
    └── js
        ├── app.js
        └── carrinho.js
