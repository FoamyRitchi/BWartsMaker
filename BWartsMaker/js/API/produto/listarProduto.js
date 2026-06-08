const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener(
    "DOMContentLoaded",
    listarProdutos
);

async function listarProdutos() {

    try {

        const response =
            await fetch(
                `${API}/api/produtos`
            );

        if (!response.ok) {

            throw new Error(
                "Erro ao carregar produtos."
            );
        }

        const produtos =
            await response.json();

        const tabela =
            document.getElementById(
                "tabela_produtos"
            );

        if (!tabela) {

            console.error(
                "Elemento #tabela_produtos não encontrado."
            );

            return;
        }

        let linhas = "";

        produtos.forEach(produto => {

            let statusClasse = "";
            let statusTexto = "";

            if (produto.qntd_prod > 5) {

                statusClasse =
                    "status__ativo";

                statusTexto =
                    "Ativo";

            } else if (
                produto.qntd_prod > 0
            ) {

                statusClasse =
                    "status__alerta";

                statusTexto =
                    "Alerta";

            } else {

                statusClasse =
                    "status__inativo";

                statusTexto =
                    "Inativo";
            }

            const imagemProduto =

                produto.img_prod &&
                produto.img_prod.trim() !== ""

                    ? `${API}${produto.img_prod}`

                    : "../../../img/assets/sem-imagem.png";

            linhas += `
                <tr>

                    <th scope="row">
                        ${produto.id_prod}
                    </th>

                    <td>
                        <img
                            src="${imagemProduto}"
                            alt="${produto.nome_prod}"
                            class="imagem__produto"
                        >

                        <span>
                            ${produto.nome_prod}
                        </span>
                    </td>

                    <td>
                        ${produto.categoria_prod || "Sem categoria"}
                    </td>

                    <td class="text-center">
                        R$ ${Number(
                            produto.valor_prod || 0
                        ).toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}
                    </td>

                    <td class="text-center">
                        ${produto.qntd_prod || 0}
                    </td>

                    <td class="text-center">
                        <span
                            class="py-1 px-2 ${statusClasse}"
                        >
                            ${statusTexto}
                        </span>
                    </td>

                    <td class="text-center">

                        <button
                            class="botao__editar"
                            onclick="editarProduto(${produto.id_prod})"
                            title="Editar produto"
                        >
                            <i class="bi bi-pencil-square"></i>
                        </button>

                        <button
                            class="botao__excluir"
                            onclick="excluirProduto(${produto.id_prod})"
                            title="Excluir produto"
                        >
                            <i class="bi bi-trash"></i>
                        </button>

                    </td>

                </tr>
            `;
        });

        tabela.innerHTML = linhas;

    } catch (erro) {

        console.error(
            "Erro ao listar produtos:",
            erro
        );

        alert(
            "Erro ao carregar produtos."
        );
    }
}

async function editarProduto(id_prod) {
    window.location.href =
        `../editar_produto/editar_produto.html?id=${id_prod}`;
}

async function excluirProduto(id_prod) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
        return;
    }  

    try {
        const response = await fetch(
            `${API}/api/produtos/${id_prod}`,
            {
                method: "DELETE"
            }
        );
        if (!response.ok) {
            throw new Error(
                `Erro ao excluir produto (${response.status})`
            );
        }
        alert("Produto excluído com sucesso.");
        listarProdutos();
    } catch (erro) {
        console.error(
            "Erro ao excluir produto:",
            erro
        );
        alert("Erro ao excluir produto.");
    }
}
