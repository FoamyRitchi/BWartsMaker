const API = "https://bwartsmaker-back-end-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("form_login");

    if (!formLogin) {
        console.error("Formulário 'form_login' não encontrado.");
        return;
    }

    formLogin.addEventListener(
        "submit",
        realizarLogin
    );
});

async function realizarLogin(event) {

    event.preventDefault();

    const erroLogin =
        document.getElementById("erro_login");

    try {

        if (erroLogin) {
            erroLogin.textContent = "";
        }

        const email = document
            .getElementById("email_user")
            .value
            .trim();

        const senha = document
            .getElementById("senha_user")
            .value;

        if (!email || !senha) {
            throw new Error(
                "Preencha e-mail e senha."
            );
        }

        const response = await fetch(
            `${API}/api/usuarios/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    email_user: email,
                    senha_user: senha
                })
            }
        );

        let data = {};

        const contentType =
            response.headers.get("content-type");

        if (
            contentType &&
            contentType.includes("application/json")
        ) {
            data = await response.json();
        }

        if (!response.ok || !data) {
            throw new Error(
                data.message ||
                "E-mail e/ou senha inválidos."
            );
        }

        console.log(
            "Usuário autenticado:",
            data
        );

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(data)
        );

        // ADMIN
        if (
            data.email_user &&
            data.email_user.toLowerCase() ===
            "admin@gmail.com"
        ) {

            window.location.href =
                "../../pages/perfil_admin/cadastrar_produto/cadastrar_produto.html";

            return;
        }

        // USUÁRIO COMUM
        window.location.href =
            "../../pages/perfil_user/visao_geral/visao_geral.html";

    } catch (error) {

        console.error(
            "Erro no login:",
            error
        );

        if (erroLogin) {
            erroLogin.textContent =
                error.message ||
                "E-mail e/ou senha incorretos";
        }

        if(erroLogin){
            exibirErroLogin("E-mail e/ou senha incorretos");
        }
    }
}