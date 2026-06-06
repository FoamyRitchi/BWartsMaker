const API = "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

    const botaoCadastrar =
        document.getElementById("botao_modal_confirmar_cadastro_produto");

    if (!botaoCadastrar) {
        return;
    }

    botaoCadastrar.addEventListener(
        "click",
        cadastrarProduto
    );
});

async function cadastrarProduto(event) {

    event.preventDefault();

    try {

        const produto = {

            nome_prod:
                document.getElementById("nome_prod").value,

            desc_prod:
                document.getElementById("desc_prod").value,

            qntd_prod:
                Number(
                    document.getElementById("qntd_prod").value
                ),

            img_prod:
                document.getElementById("input_imagem").files[0]?.name || "",

            frete_prod: 0,

            valor_prod:
                Number(
                    document.getElementById("valor_prod").value
                )
        };

        console.log(
            JSON.stringify(produto, null, 2)
        );

        const response = await fetch(
            `${API}/api/produtos`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(produto)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Erro ${response.status}`
            );
        }

        const produtoCriado =
            await response.json();

        console.log(
            "Produto criado:",
            produtoCriado
        );

        document.getElementById(
            "form_cadastrar_produto"
        ).reset();

    } catch (erro) {

        console.error(erro);

        // erroCadastro()
        alert(
            "Erro ao cadastrar produto."
        );
    }
}