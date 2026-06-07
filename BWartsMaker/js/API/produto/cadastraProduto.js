const API =
    "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

    const botaoCadastrar =
        document.getElementById(
            "botao_modal_confirmar_cadastro_produto"
        );

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

        const imagem =
            window.arquivosAtivos?.[0];

        if (!imagem) {
            alert("Selecione uma imagem.");
            return;
        }

        const nome =
            document.getElementById("nome_prod").value.trim();

        const descricao =
            document.getElementById("desc_prod").value.trim();

        const quantidade =
            Number(
                document.getElementById("qntd_prod").value
            );

        const valor =
            Number(
                document.getElementById("valor_prod").value
            );

        if (!nome) {
            alert("Informe o nome do produto.");
            return;
        }

        const formData =
            new FormData();

        formData.append(
            "nome_prod",
            nome
        );

        formData.append(
            "desc_prod",
            descricao
        );

        formData.append(
            "qntd_prod",
            quantidade
        );

        formData.append(
            "valor_prod",
            valor
        );

        formData.append(
            "frete_prod",
            0
        );

        formData.append(
            "imagem",
            imagem
        );

        console.log(
            "Arquivo enviado:",
            imagem
        );

        const response =
            await fetch(
                `${API}/api/produtos/com-imagem`,
                {
                    method: "POST",
                    body: formData
                }
            );

        if (!response.ok) {

            const erro =
                await response.text();

            console.error(erro);

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

        alert(
            "Produto cadastrado com sucesso!"
        );

        document
            .getElementById(
                "form_cadastrar_produto"
            )
            .reset();

        window.arquivosAtivos = [];

        document.querySelector(
            ".input__imagem__lista"
        ).innerHTML = "";

    } catch (erro) {

        console.error(
            "Erro ao cadastrar:",
            erro
        );

        alert(
            erro.message ||
            "Erro ao cadastrar produto."
        );
    }
}   