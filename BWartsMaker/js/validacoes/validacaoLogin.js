// Erro_login é para quando haver a verificação no banco de dados, se existe ou não o cadastro

// Inputs do usuário
let email_user = document.getElementById("email_user");

// Erros de inputs
let erro_email = document.getElementById("erro_email");
// --- let erro_login = document.getElementById("erro_email");

// Botões
let botao_login = document.getElementById("botao_login");

// "Retirar" o tamanho da div do texto
erro_email.style.display = "none";
// --- erro_login.style.display = "none";

// Verificar formato do email
email_user.addEventListener("change", () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email_user.value)) {
        erro_email.style.display = "block";
        erro_email.textContent = "ERRO: Email inválido, formato esperado: seuemail@example.com";
    } else {
        erro_email.style.display = "none";
    }
});

// Redirecionar para página do perfil
botao_login.addEventListener("click", () => {
    window.location.href = "../../pages/perfil_visao_geral/user_visao_geral.html";
})