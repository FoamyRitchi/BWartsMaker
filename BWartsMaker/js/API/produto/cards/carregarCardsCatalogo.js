const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener(
    "DOMContentLoaded",
    carregarCatalogo
);

async function carregarCatalogo() {

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

        const listaLancamentos =
            document.getElementById(
                "lista_lancamentos"
            );

        const listaChaveiros =
            document.getElementById(
                "lista_chaveiros"
            );

        const listaDecoracoes =
            document.getElementById(
                "lista_decoracoes"
            );

        const listaUtilidades =
            document.getElementById(
                "lista_utilidades"
            );

        listaLancamentos.innerHTML = "";
        listaChaveiros.innerHTML = "";
        listaDecoracoes.innerHTML = "";
        listaUtilidades.innerHTML = "";

        // Últimos cadastrados
        const lancamentos = [...produtos]
            .sort((a, b) =>
                new Date(b.data_cadastro) -
                new Date(a.data_cadastro)
            )
            .slice(0, 10);

        renderizarProdutos(
            listaLancamentos,
            lancamentos
        );

        // Categorias
        renderizarProdutos(
            listaChaveiros,
            produtos.filter(
                p =>
                    p.categoria_prod
                        ?.toLowerCase()
                        .includes("chaveiro")
            )
        );

        renderizarProdutos(
            listaDecoracoes,
            produtos.filter(
                p =>
                    p.categoria_prod
                        ?.toLowerCase()
                        .includes("decoração")
            )
        );

        renderizarProdutos(
            listaUtilidades,
            produtos.filter(
                p =>
                    p.categoria_prod
                        ?.toLowerCase()
                        .includes("utilidade")
            )
        );

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar catálogo."
        );
    }
}

function renderizarProdutos(
    container,
    produtos
) {

    produtos.forEach(produto => {

        const imagemProduto =
            produto.img_prod &&
            produto.img_prod.trim() !== ""
                ? `${API}${produto.img_prod}`
                : "../../img/assets/sem-imagem.png";

        container.innerHTML += `
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

                            <h5
                                class="text-black card__titulo"
                            >
                                ${produto.nome_prod}
                            </h5>

                            <p
                                class="text-black m-0 card__preco"
                            >
                                <b>
                                    R$ ${Number(
                                        produto.valor_prod
                                    ).toFixed(2)}
                                </b>
                            </p>

                            <p
                                class="text-black m-0 card__parcela"
                            >
                                3x sem juros
                            </p>

                        </div>

                    </a>

                </div>

            </li>
        `;
    });
}