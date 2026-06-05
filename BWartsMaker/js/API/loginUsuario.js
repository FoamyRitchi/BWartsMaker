const API = "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("form_login");

    if (!formLogin) {
        console.error("Formulário 'form_login' não encontrado.");
        return;
    }

    formLogin.addEventListener("submit", realizarLogin);
});

async function realizarLogin(event) {

    event.preventDefault();

    // Container da mensagem de erro para exibir ao usuário
    const erro_login = document.getElementById("erro_login");

    try {

        if (erro_login) {
            erro_login.textContent = "";
        }

        const email = document
            .getElementById("email_user")
            .value
            .trim();

        const senha = document
            .getElementById("senha_user")
            .value;

        if (!email || !senha) {
            throw new Error("Preencha email e senha.");
        }

        const response = await fetch(`${API}/api/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_user: email,
                senha_user: senha
            })
        });

        let data = {};

        const contentType = response.headers.get("content-type");

        if (
            contentType &&
            contentType.includes("application/json")
        ) {
            data = await response.json();
        }

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Email e/ou senha inválidos."
            );
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(data)
        );

        window.location.href = "../../pages/perfil_visao_geral/user_visao_geral.html";

    } catch (error) {

        erroLogin("E-mail e/ou senha inválidos.")

        if (erro_login) {
            erro_login.textContent =
                error.message || "Erro ao realizar login.";
        }
    }
}