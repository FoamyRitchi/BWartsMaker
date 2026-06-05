const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener(
    "DOMContentLoaded",
    listarProdutos
);

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

        const tabela =
            document.getElementById(
                "tabela_produtos"
            );

        tabela.innerHTML = "";

        produtos.forEach(produto => {

            let statusClasse = "";
            let statusTexto = "";

            if (produto.qntd_prod > 5) {
                statusClasse = "status__ativo";
                statusTexto = "Ativo";
            } else if (produto.qntd_prod > 0) {
                statusClasse = "status__alerta";
                statusTexto = "Alerta";
            } else {
                statusClasse = "status__inativo";
                statusTexto = "Inativo";
            }

            tabela.innerHTML += `
                <tr>
                    <th scope="row">
                        ${produto.id_prod}
                    </th>

                    <td>
                        <img
                            src="${produto.img_prod || '../../../img/assets/sem-imagem.png'}"
                            alt="${produto.nome_prod}"
                            class="imagem__produto"
                        >

                        <span>
                            ${produto.nome_prod}
                        </span>
                    </td>

                    <td>
                        <span>
                            ${produto.categoria?.nome_categoria || "Sem categoria"}
                        </span>
                    </td>

                    <td class="text-center">
                        R$ ${Number(produto.valor_prod).toFixed(2)}
                    </td>

                    <td class="text-center">
                        ${produto.qntd_prod}
                    </td>

                    <td class="text-center">
                        <span class="${statusClasse}">
                            ${statusTexto}
                        </span>
                    </td>

                    <td class="text-center">
                        <button
                            class="botao__editar"
                            onclick="editarProduto(${produto.id_prod})"
                        >
                            <i class="bi bi-pencil-square"></i>
                        </button>

                        <button
                            class="botao__excluir"
                            onclick="excluirProduto(${produto.id_prod})"
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar produtos."
        );
    }
}