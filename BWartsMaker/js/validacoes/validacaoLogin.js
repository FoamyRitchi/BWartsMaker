// Inputs do usuário
let cpf_user = document.getElementById("cpf_user");
let senha_user = document.getElementById("senha_user");

// Erros de inputs
let erro_cpf = document.getElementById("cpf_erro");
let erro_senha = document.getElementById("senha_erro");

// "Retirar" o tamanho da div do texto
erro_cpf.style.display = "none";
erro_senha.style.display = "none";

// Permitir que o usuário digite apenas números para informar o CPF
cpf_user.addEventListener("input", () => {
    const cpfFiltrado = cpf_user.value.replace(/[^0-9]/g, "");

    if(cpf_user.value !== cpfFiltrado){
        erro_cpf.style.display = "block";
        erro_cpf.textContent = "ERRO: Digite apenas números para informar o CPF.";
    } else {
        erro_cpf.style.display = "none";
    }

    cpf_user.value = cpfFiltrado;
});

// Limitar o CPF a apenas 11 caracteres
cpf_user.addEventListener("change", () => {
    if(cpf_user.value.length !== 11){
        erro_cpf.style.display = "block";
        erro_cpf.textContent = "ERRO: CPF deve ter 11 números";
    } else {
        erro_cpf.style.display = "none";
    }
});
