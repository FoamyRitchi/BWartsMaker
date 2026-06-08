const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener(
    "DOMContentLoaded",
    listarProdutos
);

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
                                    produto.valor_prod || 0
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

async function listarProdutos() {

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

        const listaNovidades =
            document.getElementById(
                "lista_novidades"
            );

        const listaRecomendados =
            document.getElementById(
                "lista_recomendados"
            );

        if (
            !listaNovidades ||
            !listaRecomendados
        ) {
            console.error(
                "Listas não encontradas."
            );
            return;
        }

        listaNovidades.innerHTML = "";
        listaRecomendados.innerHTML = "";

        // Produtos mais recentes
        const novidades =
            [...produtos]
                .sort(
                    (a, b) =>
                        new Date(
                            b.data_cadastro_prod
                        ) -
                        new Date(
                            a.data_cadastro_prod
                        )
                )
                .slice(0, 10);

        novidades.forEach(produto => {

            listaNovidades.innerHTML +=
                criarCard(produto);
        });

        // Todos os produtos
        produtos.forEach(produto => {

            listaRecomendados.innerHTML +=
                criarCard(produto);
        });

    } catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );

        alert(
            "Erro ao carregar produtos."
        );
    }
}