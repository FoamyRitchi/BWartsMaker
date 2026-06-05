// Variáveis de entrada de dados do endereço
const nome_rua = document.getElementById("nome_rua");
const nome_bairro = document.getElementById("nome_bairro");
const nome_cidade = document.getElementById("nome_cidade");
const nome_estado = document.getElementById("nome_estado");
const cep_endereco = document.getElementById("cep_endereco");

// Variáveis de mensagens de erro
const erro_nome_rua = document.getElementById("erro_nome_rua");
const erro_nome_bairro = document.getElementById("erro_nome_bairro");
const erro_nome_cidade = document.getElementById("erro_nome_cidade");
const erro_nome_estado = document.getElementById("erro_nome_estado");
const erro_cep_endereco = document.getElementById("erro_cep_endereco");

erro_nome_rua.style.display = "none";
erro_nome_bairro.style.display = "none";
erro_nome_cidade.style.display = "none";
erro_nome_estado.style.display = "none";
erro_cep_endereco.style.display = "none";

// Verificar se a rua tem menos de 70 caracteres
nome_rua.addEventListener("change", () => {
    verificarTamanhoMaximo(nome_rua, erro_nome_rua, "da rua", 70)
});

// Verificar se o nome do bairro tem menos de 50 caracteres
nome_bairro.addEventListener("change", () => {
    verificarTamanhoMaximo(nome_bairro, erro_nome_bairro, "do bairro", 50)    
});

// Verifica se o nome da cidade tem menos de 40 caracteres
nome_cidade.addEventListener("change", () => {
    verificarTamanhoMaximo(nome_cidade, erro_nome_cidade, "da cidade", 40)   
});

// Verifica se a sigla do estado tem apenas 2 caracteres
nome_estado.addEventListener("change", () => {
    limitarTamanhoInput(erro_nome_estado, nome_estado.value, "Digite a sigla do estado (EX: SP)", 2)   
});

// Permitir apenas números para o CEP
cep_endereco.addEventListener("input", () => {
    const cepFiltrado = apenasNumeros(cep_endereco.value);
    const mensagemErro = "Digite apenas números para informar o CEP.";

    verificarInputCorreto(erro_cep_endereco, cep_endereco.value, cepFiltrado, mensagemErro);

    cep_endereco.value = cepFiltrado;
});

// Limitar o CEP a 9 dígitos
cep_endereco.addEventListener("change", () => {
    limitarTamanhoInput(erro_cep_endereco, cep_endereco.value, "CEP deve ter 8 dígitos", 8)
});

// Verificar o tamanho do input do usuário para os campos do endereço
function verificarTamanhoMaximo(elemento, elementoErro, mensagemErro, tamanhoMaximo){
    if(elemento.value.length > tamanhoMaximo){
        elementoErro.style.display = "block";
        elementoErro.textContent = "ERRO: Nome " + mensagemErro + " deve ter menos de " + tamanhoMaximo + " caracteres.";
    } else {
        elementoErro.style.display = "none";
    }
}