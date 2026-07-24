const API_URL = "http://localhost:5000";

let produtos = [];

async function buscarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/api/Produtos`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        produtos = await resposta.json();

        const listaProdutos = document.getElementById("lista-produtos");

        produtos.forEach(produto => {
            const produtoElement = document.createElement("div");

            produtoElement.classList.add("produto-card");

            produtoElement.innerHTML = `
                <h3>${produto.nome}</h3>

                <p>
                    R$ ${produto.preco.toFixed(2)}
                </p>

                <button onclick="adicionarAoCarrinho(${produto.id})">
                    Adicionar ao carrinho
                </button>
            `;

            listaProdutos.appendChild(produtoElement);
        });

    } catch (erro) {
        console.error(erro);
    }

    atualizarIndicadorCarrinho();
}

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

buscarProdutos();