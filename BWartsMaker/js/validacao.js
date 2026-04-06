let nome_user = document.getElementById("nome_user");
let email_user = document.getElementById("email_user");
let botao_cadastrar = document.getElementById("botao_cadastrar");

botao_cadastrar.addEventListener("click", () => {
    if(!isNaN(nome_user)){
        alert("ERRO: Nome de usuário não pode ser um número.");
    }

    if(!isNaN(email_user)){
        alert("ERRO: Email de usuário não pode ser um número.");
    }
});
