let modoEdicao = false;

document.addEventListener("DOMContentLoaded", () => {

    const botaoEditar = document.getElementById("botao_editar");

    if (!botaoEditar) {
        console.error("Botão de edição não encontrado.");
        return;
    }

    botaoEditar.addEventListener(
        "click",
        alternarEdicao
    );
});

async function alternarEdicao() {

    const campos = document.querySelectorAll(
        "#nome_user, #email_user, #telefone_user, #dataNasc_user, #cep_user, #numero_user, #rua_user, #bairro_user, #cidade_user, #estado_user"
    );

    // Se estiver em edição, tenta salvar primeiro
    if (modoEdicao) {

        const sucesso = await salvarPerfil();

        if (!sucesso) {
            return;
        }
    }

    modoEdicao = !modoEdicao;

    campos.forEach(campo => {
        campo.disabled = !modoEdicao;
    });

    document.getElementById("botao_editar").textContent =
        modoEdicao
            ? "Salvar alterações"
            : "Editar perfil";
}

async function salvarPerfil() {

    try {

        const usuarioLogado = JSON.parse(
            localStorage.getItem("usuarioLogado")
        );

        if (!usuarioLogado) {
            throw new Error("Usuário não encontrado.");
        }

        const usuarioAtualizado = {

            id_user: usuarioLogado.id_user,

            nome_user:
                document.getElementById("nome_user").value.trim(),

            email_user:
                document.getElementById("email_user").value.trim(),

            cpf_user:
                document.getElementById("cpf_user").value.trim(),

            senha_user:
                usuarioLogado.senha_user,

            dataNasc_user:
                document.getElementById("dataNasc_user").value,

            telefone: {

                id_telefone:
                    usuarioLogado.telefone?.id_telefone,

                ddd_telefone:
                    usuarioLogado.telefone?.ddd_telefone,

                numero_telefone:
                    document.getElementById("telefone_user").value.trim()
            },

            endereco: {

                id_endereco:
                    usuarioLogado.endereco?.id_endereco,

                cep_endereco:
                    document.getElementById("cep_user").value.trim(),

                numero_endereco:
                    Number(
                        document.getElementById("numero_user").value
                    ),

                rua: {

                    id_rua:
                        usuarioLogado.endereco?.rua?.id_rua,

                    nome_rua:
                        document.getElementById("rua_user").value.trim()
                },

                bairro: {

                    id_bairro:
                        usuarioLogado.endereco?.bairro?.id_bairro,

                    nome_bairro:
                        document.getElementById("bairro_user").value.trim()
                },

                cidade: {

                    id_cidade:
                        usuarioLogado.endereco?.cidade?.id_cidade,

                    nome_cidade:
                        document.getElementById("cidade_user").value.trim()
                },

                estado: {

                    id_estado:
                        usuarioLogado.endereco?.estado?.id_estado,

                    nome_estado:
                        document.getElementById("estado_user").value.trim()
                }
            }
        };

        console.log(
            "JSON enviado:",
            JSON.stringify(usuarioAtualizado, null, 2)
        );

        const response = await fetch(
            `${API}/api/usuarios/${usuarioLogado.id_user}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuarioAtualizado)
            }
        );

        const textoResposta = await response.text();

        console.log("Resposta API:");
        console.log(textoResposta);

        if (!response.ok) {
            throw new Error(
                `Erro ao atualizar perfil (${response.status})`
            );
        }

        const usuarioAtualizadoAPI =
            JSON.parse(textoResposta);

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuarioAtualizadoAPI)
        );

        new bootstrap.Modal(document.getElementById("modal_sucesso_edicao")).show();

        return true;

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        alert(
            erro.message ||
            "Não foi possível atualizar o perfil."
        );

        return false;
    }
}