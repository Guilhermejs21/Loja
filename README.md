# Loja Full Stack

Loja virtual full stack com API REST em ASP.NET Core, persistência em SQL Server e interface construída com HTML, CSS e JavaScript puro.

## Funcionalidades

- Listagem e consulta de produtos
- Cadastro, atualização e exclusão de produtos
- Cadastro e consulta de clientes
- Criação e consulta de pedidos
- Carrinho persistido no navegador com `localStorage`
- Controle de quantidade, subtotal e total

## Tecnologias

**Backend:** C#, ASP.NET Core Web API, Entity Framework Core, SQL Server e Swagger.

**Frontend:** HTML5, CSS3 e JavaScript, sem frameworks.

## Estrutura

```text
Loja/
├── BackEnd/loja.api/
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   └── Models/
└── FrontEnd/
    ├── css/
    ├── js/
    ├── index.html
    └── carrinho.html
```

## Como executar

### Backend

1. Tenha o SQL Server disponível.
2. Confira `DefaultConnection` em `BackEnd/loja.api/appsettings.json`.
3. Execute:

```bash
dotnet restore BackEnd/loja.api/loja.api.csproj
dotnet ef database update --project BackEnd/loja.api
dotnet run --project BackEnd/loja.api
```

### Frontend

Abra `FrontEnd/index.html` com um servidor local, como o Live Server. Se a porta da API mudar, atualize a URL utilizada nos arquivos JavaScript.

## Endpoints principais

- `/Produtos`
- `/Cliente`
- `/Pedidos`

## Aprendizados

Projeto criado para praticar a integração completa entre frontend, API REST e banco de dados, incluindo CRUD, relacionamentos e consumo de API com `fetch`.
