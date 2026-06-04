const API = "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener("DOMContentLoaded", carregarPerfil);

async function carregarPerfil() {

    try {

        const usuarioLogado = JSON.parse(
            localStorage.getItem("usuarioLogado")
        );

        if (!usuarioLogado || !usuarioLogado.id_user) {

            alert("Faça login para acessar seu perfil.");

            window.location.href =
                "../forms/form_login.html";

            return;
        }

        console.log("Usuário logado:", usuarioLogado);

        const response = await fetch(
            `${API}/api/usuarios/${usuarioLogado.id_user}`
        );

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar usuário (${response.status})`
            );
        }

        const usuario = await response.json();

        console.log("Usuário carregado:", usuario);

        preencherFormulario(usuario);

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao carregar perfil.");
    }
}

function preencherFormulario(usuario) {

    // Dados pessoais
    document.getElementById("nome_user").value =
        usuario.nome_user ?? "";

    document.getElementById("email_user").value =
        usuario.email_user ?? "";

    document.getElementById("cpf_user").value =
        usuario.cpf_user ?? "";

    document.getElementById("dataNasc_user").value =
        usuario.dataNasc_user
            ? usuario.dataNasc_user.split("T")[0]
            : "";

    // Telefone
    document.getElementById("telefone_user").value =
        usuario.telefone?.numero_telefone ?? "";

    // Endereço
    document.getElementById("cep_user").value =
        usuario.endereco?.cep_endereco ?? "";

    document.getElementById("numero_user").value =
        usuario.endereco?.numero_endereco ?? "";

    document.getElementById("rua_user").value =
        usuario.endereco?.rua?.nome_rua ?? "";

    document.getElementById("bairro_user").value =
        usuario.endereco?.bairro?.nome_bairro ?? "";

    document.getElementById("cidade_user").value =
        usuario.endereco?.cidade?.nome_cidade ?? "";

    document.getElementById("estado_user").value =
        usuario.endereco?.estado?.nome_estado ?? "";
}