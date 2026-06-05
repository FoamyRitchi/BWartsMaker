

document.addEventListener("DOMContentLoaded", () => {

    const botaoExcluir =
        document.getElementById("botao_excluir");

    if (!botaoExcluir) {
        console.error(
            "Botão 'botao_excluir' não encontrado."
        );
        return;
    }

    botaoExcluir.addEventListener(
        "click",
        excluirConta
    );
});

async function excluirConta() {

    const confirmacao = prompt(
        'Digite "EXCLUIR" para confirmar a exclusão da conta.'
    );

    if (confirmacao !== "EXCLUIR") {

        alert(
            "Exclusão cancelada."
        );

        return;
    }

    try {

        const usuarioLogado = JSON.parse(
            localStorage.getItem("usuarioLogado")
        );

        if (!usuarioLogado?.id_user) {
            throw new Error(
                "Usuário não encontrado."
            );
        }

        console.log(
            `Excluindo usuário ${usuarioLogado.id_user}`
        );

        const response = await fetch(
            `${API}/api/usuarios/${usuarioLogado.id_user}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const erro = await response.text();

            throw new Error(
                erro ||
                `Erro ${response.status}`
            );
        }

        localStorage.removeItem(
            "usuarioLogado"
        );

        alert(
            "Conta excluída com sucesso."
        );

        window.location.href =
            "../../pages/global/index.html";

    } catch (erro) {

        console.error(
            "Erro ao excluir conta:",
            erro
        );

        alert(
            erro.message ||
            "Não foi possível excluir a conta."
        );
    }
}