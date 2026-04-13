// Variáveis de entrada de dados do usuário
let nome_user = document.getElementById("nome_user");
let email_user = document.getElementById("email_user");
let cpf_user = document.getElementById("cpf_user");
let ddd_user = document.getElementById("ddd_user");
let telefone_user = document.getElementById("telefone_user");
let senha_user = document.getElementById("senha_user");
let confirmar_senha = document.getElementById("confirmar_senha");
let botao_cadastrar = document.getElementById("botao_cadastrar");
// Variáveis de mensagens de erro
let erro_nome = document.getElementById("erro_nome");
let erro_email = document.getElementById("erro_email");
let erro_cpf = document.getElementById("erro_cpf");
let erro_ddd = document.getElementById("erro_ddd");
let erro_senha_fraca = document.getElementById("erro_senha_fraca");
let erro_senha_tamanho = document.getElementById("erro_senha_tamanho");
let erro_confirmar = document.getElementById("erro_confirmar");
let erro_telefone = document.getElementById("erro_telefone");
// Configuração de esconder o erro
erro_nome.style.display = "none";
erro_email.style.display = "none";
erro_cpf.style.display = "none";
erro_ddd.style.display = "none";
erro_telefone.style.display = "none";
erro_senha_fraca.style.display = "none";
erro_senha_tamanho.style.display = "none";
erro_confirmar.style.display = "none";

// Permitir que o usuário use apenas letras para digitar o nome
nome_user.addEventListener("input", () => {
    const nomeFiltrado = nome_user.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); 
    const mensagemErro = "Apenas letras são permitidas";

    verificarInputCorreto(erro_nome, nome_user.value, nomeFiltrado, mensagemErro);

    nome_user.value = nomeFiltrado;
});

// Não permitir que o usuario digite um nome com menos de 3 letras ou um nome com mais de 50 letras
nome_user.addEventListener("change", () => {
    if(nome_user.value.length < 3){
        erro_nome.style.display = "block";
        erro_nome.textContent = "ERRO: Nome deve ter mais de 3 letras";
    } else if (nome_user.value.length > 50){
        erro_nome.style.display = "block";
        erro_nome.textContent = "ERRO: Nome deve ter menos de 50 letras";
    } else {
        erro_nome.style.display = "none";
    }
});

// Verificar se o email tem o formato de um email verdadeiro
email_user.addEventListener("change", () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  

    if(!regex.test(email_user.value)){
        erro_email.style.display = "block";
        erro_email.textContent = "ERRO: Email inválido, formato esperado -> email@example.com";
    } else {
        erro_email.style.display = "none";
    }
});

// Permitir que o usuário digite apenas números para informar o CPF
cpf_user.addEventListener("input", () => {
    const cpfFiltrado = apenasNumeros(cpf_user.value);
    const mensagemErro = "Digite apenas números para informar o CPF.";

    verificarInputCorreto(erro_cpf, cpf_user.value, cpfFiltrado, mensagemErro);

    cpf_user.value = cpfFiltrado;
});

// Limitar o CPF a apenas 11 caracteres
cpf_user.addEventListener("change", () => {
    const mensagemErro = "CPF deve ter 11 números";
    limitarTamanhoInput(erro_cpf, cpf_user.value, mensagemErro, 11);
});

// Permitir que o usuário digite apenas números no DDD
ddd_user.addEventListener("input", () => {
    const dddFiltrado = apenasNumeros(ddd_user.value);
    const mensagemErro = "Digite apenas números para o DDD.";

    verificarInputCorreto(erro_ddd, ddd_user.value, dddFiltrado, mensagemErro);

    ddd_user.value = dddFiltrado;
})

// Limitar o DDD apenas para 2 dígitos(Todos os DDD do Brasil têm apenas 2 dígitos)
ddd_user.addEventListener("change", () => {
    const mensagemErro = "DDD teve ter apenas 2 números";
    limitarTamanhoInput(erro_ddd, ddd_user.value, mensagemErro, 2);
});

// Limitar o telefone apenas para números
telefone_user.addEventListener("input", () => {
    const telefoneFiltrado = apenasNumeros(telefone_user.value);
    const mensagemErro = "Digite apenas números para o telefone.";

    verificarInputCorreto(erro_telefone, telefone_user.value, telefoneFiltrado, mensagemErro);

    telefone_user.value = telefoneFiltrado;
})

// Limitar o tamanho do telefone apenas para 11 números
telefone_user.addEventListener("change", () => {
    const mensagemErro = "Telefone deve ter 11 números";
    limitarTamanhoInput(erro_telefone, telefone_user.value, mensagemErro, 11);
});

// Verificar força da senha, se tem ao menos 1 número, uma letra maiúscula, uma letra minúscula
senha_user.addEventListener("change", () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if(!regex.test(senha_user.value)){
        erro_senha_fraca.style.display = "block";
        erro_senha_fraca.textContent = "ERRO: Senha fraca";
    } else {
        erro_senha_fraca.style.display = "none";
    }
});

// Verificar se a senha tem menos de 8 caracteres
senha_user.addEventListener("change", () => {  
    if(senha_user.value.length < 8){
        erro_senha_tamanho.style.display = "block";
        erro_senha_tamanho.textContent = "ERRO: A senha deve ter no mínimo 8 caracteres";
    } else {
        erro_senha_tamanho.style.display = "none";
    }
})

confirmar_senha.addEventListener("change", () => {  
    if(confirmar_senha.value !== senha_user.value){    
        erro_confirmar.style.display = "block";
        erro_confirmar.textContent = "ERRO: Senhas digitadas não são iguais";
    } else {
        erro_confirmar.style.display = "none";
    }
})

// Função para filtrar o input deixando apenas números
function apenasNumeros(inputParaFiltrar){
    return inputParaFiltrar.replace(/[^0-9]/g, "");
}

// Verificar se o valor filtrado cumpre os requisitos das restrições
function verificarInputCorreto(elementoErro, input, inputFiltrado, mensagem){
    if(input !== inputFiltrado){
        elementoErro.style.display = "block";
        elementoErro.textContent = "ERRO: " + mensagem;
    } else {
        elementoErro.style.display = "none";
    }
}

// Limita o tamanho de um input para ser estritamente igual
function limitarTamanhoInput(elementoErro, input, mensagem, limiteTamanho){
    if(input.length !== limiteTamanho){
        elementoErro.style.display = "block";
        elementoErro.textContent = "ERRO: " + mensagem;
    } else {
        elementoErro.style.display = "none";
    }
}