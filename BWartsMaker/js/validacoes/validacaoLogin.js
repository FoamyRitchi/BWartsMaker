const email_user = document.getElementById("email_user");
const senha_user = document.getElementById("senha_user");

const erro_login = document.getElementById("erro_login");

erro_login.style.display = "none";

email_user.addEventListener("focus", () => {
    erro_login.style.display = "none";
})

senha_user.addEventListener("focus", () => {
    erro_login.style.display = "none";
})

function exibirErroLogin(mensagemErro) {
    erro_login.style.display = "block";
    erro_login.textContent = mensagemErro;
}