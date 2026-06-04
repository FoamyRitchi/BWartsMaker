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

    const erroElement = document.getElementById("erro_email");

    try {

        if (erroElement) {
            erroElement.textContent = "";
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
                "Email ou senha inválidos."
            );
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(data)
        );

        window.location.href = "../../pages/perfil_visao_geral/user_visao_geral.html";

    } catch (error) {

        console.error("Erro no login:", error);

        if (erroElement) {
            erroElement.textContent =
                error.message || "Erro ao realizar login.";
        }
    }
}