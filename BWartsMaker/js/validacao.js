// Variáveis de entrada de dados do usuário
let nome_user = document.getElementById("nome_user");
let email_user = document.getElementById("email_user");
let cpf_user = document.getElementById("cpf_user");
let ddd_user = document.getElementById("ddd_user");
let botao_cadastrar = document.getElementById("botao_cadastrar");
// Variáveis de mensagens de erro
let erro_nome = document.getElementById("erro_nome");
let erro_email = document.getElementById("erro_email");
let erro_cpf = document.getElementById("erro_cpf");
let erro_ddd = document.getElementById("erro_ddd");
// Configuração de esconder o erro
erro_nome.style.display = "none";
erro_email.style.display = "none";
erro_cpf.style.display = "none";
erro_ddd.style.display = "none";

// Permitir que o usuário use apenas letras para digitar o nome
nome_user.addEventListener("input", () => {
    const nomeFiltrado = nome_user.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); 
    const mensagemErro = "Apenas letras são permitidas";

    verificarInputCorreto(erro_nome, nome_user.value, nomeFiltrado, mensagemErro);

    nome_user.value = nomeFiltrado;
});

// Não permitir que o usuario digite um nome com menos de 3 letras ou um nome com mais de 50 letras
nome_user.addEventListener("keydown", (tecla) => {
    if(tecla.key === "Enter"){
        if(nome_user.value.length < 3){
            erro_nome.style.display = "block";
            erro_nome.textContent = "ERRO: Nome deve ter mais de 3 letras";
        } else if (nome_user.value.length > 50){
            erro_nome.style.display = "block";
            erro_nome.textContent = "ERRO: Nome deve ter menos de 50 letras";
        } else {
            erro_nome.style.display = "none";
        }
    }
});

// Verificar se o email tem o formato de um email verdadeiro
email_user.addEventListener("keydown", (tecla) => {
    if(tecla.key === "Enter"){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
        
        if(!regex.test(email_user.value)){
            erro_email.style.display = "block";
            erro_email.textContent = "ERRO: Email inválido";
        } else {
            erro_email.style.display = "none";
        }
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
cpf_user.addEventListener("keydown", (tecla) => {
    const mensagemErro = "CPF deve ter 11 números";
    const tamanhoEsperado = 11;
    if(tecla.key === "Enter"){
        limitarTamanhoInput(erro_cpf, cpf_user.value, mensagemErro, tamanhoEsperado);
    }
});

// Permitir que o usuário digite apenas números no DDD
ddd_user.addEventListener("input", () => {
    const dddFiltrado = apenasNumeros(ddd_user.value);
    const mensagemErro = "Digite apenas números para o DDD.";

    verificarInputCorreto(erro_ddd, ddd_user.value, dddFiltrado, mensagemErro);

    ddd_user.value = dddFiltrado;
})

// Limitar o DDD apenas para 2 dígitos(Todos os DDD do Brasil têm apenas 2 dígitos)
ddd_user.addEventListener("keydown", (tecla) => {
    const mensagemErro = "DDD teve ter apenas 2 números";
    const tamanhoEsperado = 2;
    if(tecla.key === "Enter"){
        limitarTamanhoInput(erro_ddd, ddd_user.value, mensagemErro, tamanhoEsperado);
    }
});

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