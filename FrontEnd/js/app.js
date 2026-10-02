
const API_URL = "https://lojaapi-g2abehaugpc5grgk.canadacentral-01.azurewebsites.net";

let produtos = [];

// BUSCAR PRODUTOS
async function buscarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/api/Produtos`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        produtos = await resposta.json();

        renderizarProdutos();

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }

    atualizarIndicadorCarrinho();
}

// RENDERIZAR PRODUTOS
function renderizarProdutos() {
    const listaProdutos = document.getElementById("lista-produtos");

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const produtoElement = document.createElement("div");

        produtoElement.classList.add("produto-card");

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}`;

        const botao = document.createElement("button");
        botao.textContent = "Adicionar ao carrinho";
        botao.addEventListener("click", () => {
            adicionarAoCarrinho(produto.id);
        });

        produtoElement.append(titulo, preco, botao);

        listaProdutos.appendChild(produtoElement);
    });
}

// CADASTRAR PRODUTO
async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome-produto").value.trim();

    const preco = Number(
        document.getElementById("preco-produto").value
    );

    const botao = document.getElementById("btn-cadastrar");

    if (!nome || !Number.isFinite(preco) || preco <= 0) {
        alert("Informe um nome e um preço válido.");
        return;
    }

    const novoProduto = {
        nome: nome,
        preco: preco
    };

    try {
        botao.disabled = true;
        botao.textContent = "Cadastrando...";

        const resposta = await fetch(`${API_URL}/api/Produtos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProduto)
        });

        if (!resposta.ok) {
            const mensagem = await resposta.text();

            throw new Error(
                mensagem || `Erro HTTP ${resposta.status}`
            );
        }

        alert("Produto cadastrado com sucesso!");

        document.getElementById("form-produto").reset();

        await buscarProdutos();

    } catch (erro) {
        console.error("Erro ao cadastrar produto:", erro);

        alert("Não foi possível cadastrar o produto. Verifique a API.");

    } finally {
        botao.disabled = false;
        botao.textContent = "Cadastrar produto";
    }
}

// ADICIONAR AO CARRINHO
function adicionarAoCarrinho(id) {
    const carrinho = JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

    const produtoExistente = carrinho.find(
        produto => produto.id === id
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        const produto = produtos.find(
            produto => produto.id === id
        );

        if (!produto) return;

        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarIndicadorCarrinho();
}

// ATUALIZAR INDICADOR DO CARRINHO
function atualizarIndicadorCarrinho() {
    const carrinho = JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

    const quantidadeTotal = carrinho.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const indicador = document.getElementById(
        "quantidade-carrinho"
    );

    if (indicador) {
        indicador.textContent = quantidadeTotal;
    }
}

// INICIALIZAÇÃO
document.getElementById("form-produto")
    .addEventListener("submit", cadastrarProduto);

buscarProdutos();
