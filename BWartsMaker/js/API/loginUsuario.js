const API = "https://bwartsmaker-back-end-production.up.railway.app";

const formLogin = document.getElementById("form_login");

async function realizarLogin() {

    try {

        const email =
            document.getElementById("email_user").value.trim();

        const senha =
            document.getElementById("senha_user").value;

        const response = await fetch(`${API}/api/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email_user: email,

                senha_user: senha
            })
        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Email ou senha inválidos."
            );
        }

        console.log("Usuário autenticado:");
        console.log(data);

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(data)
        );

        window.location.href =
            "../../index.html";

    } catch (error) {

        console.error(error);

        document.getElementById("erro_email").textContent =
            error.message;
    }
}

formLogin.addEventListener("submit", async (event) => {

    event.preventDefault();

    await realizarLogin();
});