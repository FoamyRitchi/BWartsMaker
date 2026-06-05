const erro_login = document.getElementById("erro_login");
const botao_login = document.getElementById("botao_login");
erro_login.style.display = "none";

function erroLogin(mensagemErro) {
    erro_login.style.display = "block";
    erro_login.textContent = mensagemErro;
}