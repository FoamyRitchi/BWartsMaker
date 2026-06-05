// Variáveis de entrada de dados do usuário
const nome_user = document.getElementById("nome_user");
const email_user = document.getElementById("email_user");
const cpf_user = document.getElementById("cpf_user");
const ddd_user = document.getElementById("ddd_telefone");
const telefone_user = document.getElementById("numero_telefone");
const senha_user = document.getElementById("senha_user");
const confirmar_senha = document.getElementById("confirmar_senha");
const dataNasc_user = document.getElementById("dataNasc_user");

// Variáveis de mensagens de erro
const erro_nome = document.getElementById("erro_nome");
const erro_email = document.getElementById("erro_email");
const erro_cpf = document.getElementById("erro_cpf");
const erro_cpf_formato = document.getElementById("erro_cpf_formato");
const erro_ddd = document.getElementById("erro_ddd");
const erro_senha_fraca = document.getElementById("erro_senha_fraca");
const erro_senha_tamanho = document.getElementById("erro_senha_tamanho");
const erro_confirmar = document.getElementById("erro_confirmar");
const erro_telefone = document.getElementById("erro_telefone");
const erro_dataNasc_user = document.getElementById("erro_dataNasc_user");

// Configuração de esconder os erros
erro_nome.style.display = "none";
erro_email.style.display = "none";
erro_cpf.style.display = "none";
erro_cpf_formato.style.display = "none";
erro_ddd.style.display = "none";
erro_telefone.style.display = "none";
erro_senha_fraca.style.display = "none";
erro_senha_tamanho.style.display = "none";
erro_confirmar.style.display = "none";
erro_dataNasc_user.style.display = "none";

// Permitir que o usuário use apenas letras para digitar o nome
nome_user.addEventListener("input", () => {
    const nomeFiltrado = nome_user.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    const mensagemErro = "Apenas letras são permitidas";

    verificarInputCorreto(erro_nome, nome_user.value, nomeFiltrado, mensagemErro);

    nome_user.value = nomeFiltrado;
});

// Não permitir nome com menos de 3 ou mais de 60 letras
nome_user.addEventListener("change", () => {
    if (nome_user.value.length < 3) {
        erro_nome.style.display = "block";
        erro_nome.textContent = "ERRO: Nome deve ter mais de 3 letras";
    } else if (nome_user.value.length > 60) {
        erro_nome.style.display = "block";
        erro_nome.textContent = "ERRO: Nome deve ter menos de 50 letras";
    } else {
        erro_nome.style.display = "none";
    }
});

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

// Permitir apenas números no CPF
cpf_user.addEventListener("input", () => {
    const cpfFiltrado = apenasNumeros(cpf_user.value);
    const mensagemErro = "Digite apenas números para informar o CPF.";

    verificarInputCorreto(erro_cpf, cpf_user.value, cpfFiltrado, mensagemErro);

    cpf_user.value = cpfFiltrado;
});

// Limitar o CPF a 11 dígitos
cpf_user.addEventListener("change", () => {
    limitarTamanhoInput(erro_cpf, cpf_user.value, "CPF deve ter 11 números", 11);
});

// Verificar se o CPF é um CPF válido
cpf_user.addEventListener("change", () => {
    // Verifica se tem 11 dígitos ou é sequência repetida
    const sequenciasInvalidas = [
        "00000000000","11111111111","22222222222", "33333333333","44444444444",
        "55555555555","66666666666", "77777777777","88888888888","99999999999"
    ];

    if (sequenciasInvalidas.includes(cpf_user.value)) {
        erro_cpf_formato.style.display = "block";
        erro_cpf_formato.textContent = "ERRO: CPF inválido";
        return;
    }

    // Validar 1º dígito verificador
    let soma = 0;
    
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf_user.value[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) {
        resto = 0
    };

    if (resto !== parseInt(cpf_user.value[9])) {
        erro_cpf_formato.style.display = "block";
        erro_cpf_formato.textContent = "ERRO: CPF inválido";
        return;
    }

    // Validar 2º dígito verificador
    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf_user.value[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf_user.value[10])) {
        erro_cpf_formato.style.display = "block";
        erro_cpf_formato.textContent = "ERRO: CPF inválido";
        return;
    }

    erro_cpf_formato.style.display = "none";
});

// Permitir apenas números no DDD
ddd_user.addEventListener("input", () => {
    const dddFiltrado = apenasNumeros(ddd_user.value);
    const mensagemErro = "Digite apenas números para o DDD.";

    verificarInputCorreto(erro_ddd, ddd_user.value, dddFiltrado, mensagemErro);

    ddd_user.value = dddFiltrado;
});

// Limitar o DDD a 2 dígitos
ddd_user.addEventListener("change", () => {
    limitarTamanhoInput(erro_ddd, ddd_user.value, "DDD deve ter apenas 2 números", 2);
});

// Permitir apenas números no telefone
telefone_user.addEventListener("input", () => {
    const telefoneFiltrado = apenasNumeros(telefone_user.value);
    const mensagemErro = "Digite apenas números para o telefone.";

    verificarInputCorreto(erro_telefone, telefone_user.value, telefoneFiltrado, mensagemErro);

    telefone_user.value = telefoneFiltrado;
});

// Limitar o telefone apenas a 9 dígitos 
telefone_user.addEventListener("change", () => {
    if (telefone_user.value.length !== 9) {
        erro_telefone.style.display = "block";
        erro_telefone.textContent = "ERRO: Telefone deve ter 8 números";
    } else {
        erro_telefone.style.display = "none";
    }
});

// Validação da senha com mais de 8 dígitos, uma letra maiúscula, uma letra minúscula e pelo menos 1 número
senha_user.addEventListener("change", () => {
    if (senha_user.value.length < 8) {
        erro_senha_tamanho.style.display = "block";
        erro_senha_tamanho.textContent = "ERRO: A senha deve ter no mínimo 8 caracteres";
        erro_senha_fraca.style.display = "none";
        return;
    }

    erro_senha_tamanho.style.display = "none";

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (!regex.test(senha_user.value)) {
        erro_senha_fraca.style.display = "block";
        erro_senha_fraca.textContent = "ERRO: Senha fraca, use maiúsculas, minúsculas e números";
    } else {
        erro_senha_fraca.style.display = "none";
    }
});

// Verificar se as senhas coincidem
confirmar_senha.addEventListener("change", () => {
    if (confirmar_senha.value !== senha_user.value) {
        erro_confirmar.style.display = "block";
        erro_confirmar.textContent = "ERRO: Senhas digitadas não são iguais";
    } else {
        erro_confirmar.style.display = "none";
    }
});

// Verifica se o usuário tem 18 anos ou mais
dataNasc_user.addEventListener("blur", () => {
    const dataNascimentoUser = new Date(dataNasc_user.value);
    const hoje = new Date();

    dataNascimentoUser.setFullYear(dataNascimentoUser.getFullYear() + 18);

    if(hoje < dataNascimentoUser){
        erro_dataNasc_user.style.display = "block";
        erro_dataNasc_user.textContent = "ERRO: Usuário deve ter mais de 18 anos";
    } else {
        erro_dataNasc_user.style.display = "none";
    }
})

// Função para filtrar o input deixando apenas números
function apenasNumeros(inputParaFiltrar) {
    return inputParaFiltrar.replace(/[^0-9]/g, "");
}

// Verificar se o valor filtrado cumpre os requisitos
function verificarInputCorreto(elementoErro, input, inputFiltrado, mensagem) {
    if (input !== inputFiltrado) {
        elementoErro.style.display = "block";
        elementoErro.textContent = "ERRO: " + mensagem;
    } else {
        elementoErro.style.display = "none";
    }
}

// Faz o tamanho de um input ser estritamente igual ao limite
function limitarTamanhoInput(elementoErro, input, mensagem, limiteTamanho) {
    if (input.length !== limiteTamanho) {
        elementoErro.style.display = "block";
        elementoErro.textContent = "ERRO: " + mensagem;
    } else {
        elementoErro.style.display = "none";
    }
}