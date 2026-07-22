const carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];

const listaCarrinho = document.getElementById(
    "lista-carrinho"
);

const totalCarrinho = document.getElementById(
    "total-carrinho"
);

const indicadorCarrinho = document.getElementById(
    "quantidade-carrinho"
);

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";

    let total = 0;

    let quantidadeTotal = 0;

    if (carrinho.length === 0) {

        listaCarrinho.innerHTML = `
            <p>Seu carrinho está vazio.</p>
        `;

    } else {

        carrinho.forEach(produto => {

            const subtotal =
                produto.preco * produto.quantidade;

            total += subtotal;

            quantidadeTotal += produto.quantidade;

            const produtoElement =
                document.createElement("div");

            produtoElement.classList.add(
                "item-carrinho"
            );

            produtoElement.innerHTML = `

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    Quantidade:
                    ${produto.quantidade}
                </p>

                <p>
                    Preço unitário:
                    R$ ${produto.preco.toFixed(2)}
                </p>

                <p>
                    Subtotal:
                    R$ ${subtotal.toFixed(2)}
                </p>

                <button
                    onclick="removerUmaUnidade(${produto.id})">

                    Remover

                </button>

            `;

            listaCarrinho.appendChild(
                produtoElement
            );
        });
    }

    totalCarrinho.textContent =
        `Total: R$ ${total.toFixed(2)}`;

    indicadorCarrinho.textContent =
        quantidadeTotal;
}

function removerUmaUnidade(id) {

    const produto = carrinho.find(
        produto => produto.id === id
    );

    if (!produto) {
        return;
    }

    produto.quantidade--;

    if (produto.quantidade <= 0) {

        const indiceProduto =
            carrinho.findIndex(
                produto => produto.id === id
            );

        carrinho.splice(
            indiceProduto,
            1
        );
    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarCarrinho();
}

atualizarCarrinho();