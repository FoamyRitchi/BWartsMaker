const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener(
    "DOMContentLoaded",
    carregarCardsCompras
);

async function carregarCardsCompras() {

    try {

        const response = await fetch(
            `${API}/api/produtos`
        );

        if (!response.ok) {
            throw new Error(
                "Erro ao carregar produtos."
            );
        }

        const produtos =
            await response.json();

        const listaRecomendacoes =
            document.getElementById(
                "lista_recomendacoes"
            );

        const listaPesquisas =
            document.getElementById(
                "lista_pesquisas"
            );

        listaRecomendacoes.innerHTML = "";
        listaPesquisas.innerHTML = "";

        // Recomendações
        const recomendacoes =
            [...produtos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        recomendacoes.forEach(produto => {

            listaRecomendacoes.innerHTML +=
                criarCard(produto);

        });

        // Baseados em suas pesquisas
        const pesquisas =
            [...produtos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        pesquisas.forEach(produto => {

            listaPesquisas.innerHTML +=
                criarCard(produto);

        });

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar produtos."
        );
    }
}

function criarCard(produto) {

    const imagemProduto =
        produto.img_prod &&
        produto.img_prod.trim() !== ""
            ? `${API}${produto.img_prod}`
            : "../../img/assets/sem-imagem.png";

    return `
        <li class="swiper-slide">

            <div
                class="card py-1 card__produto"
                style="max-width: 13rem;"
            >

                <a href="../compras/compras.html?id=${produto.id_prod}">

                    <img
                        src="${imagemProduto}"
                        class="card-img-top card__imagem"
                        alt="${produto.nome_prod}"
                    >

                    <div class="card-body py-1">

                        <h5 class="text-black card__titulo">
                            ${produto.nome_prod}
                        </h5>

                        <p class="text-black m-0 card__preco">
                            <b>
                                R$ ${Number(
                                    produto.valor_prod
                                ).toFixed(2)}
                            </b>
                        </p>

                        <p class="text-black m-0 card__parcela">
                            3x sem juros
                        </p>

                    </div>

                </a>

            </div>

        </li>
    `;
}