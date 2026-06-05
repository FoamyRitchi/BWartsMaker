// Etapa1 - Dados pessoais
const etapa1 = document.getElementById("etapa1");
const icone_etapa1 = document.getElementById("icone_etapa1");
const texto_icone_etapa1 = document.getElementById("texto_icone_etapa1");

// Etapa2 - Endereço
const etapa2 = document.getElementById("etapa2");
const icone_etapa2 = document.getElementById("icone_etapa2");
const texto_icone_etapa2 = document.getElementById("texto_icone_etapa2");

// Botão para passar etapa
const botao_proxima_etapa = document.getElementById("botao_proxima_etapa");
const botao_voltar_etapa = document.getElementById("botao_voltar_etapa");

// Botão de cadastro
const botao_cadastrar = document.getElementById("botao_cadastrar");

alterarEtapa(1);

botao_proxima_etapa.addEventListener("click", () => {
    verificarPassagemEtapa()
})

botao_voltar_etapa.addEventListener("click", () => {
    alterarEtapa(1);
})

// Alterar entre etapas 1 e 2
function alterarEtapa(etapa){
    // Dados pessoais
    if(etapa === 1) {
        // Mostrar formulário de dados pessoais
        etapa1.style.display = "block";
        etapa2.style.display = "none";

        icone_etapa1.className = "bi bi-1-circle-fill fs-3";
        icone_etapa1.style.color = "orange";
        texto_icone_etapa1.style.color = "orange";
        
        icone_etapa2.className = "bi bi-2-circle fs-3";
        icone_etapa2.style.color = "white";
        texto_icone_etapa2.style.color = "white";
    // Endereço 
    } else if (etapa === 2) {
        // Mostrar formulário de endereço
        etapa2.style.display = "block";
        etapa1.style.display = "none";

        icone_etapa2.className = "bi bi-2-circle-fill fs-3";
        icone_etapa2.style.color = "orange";
        texto_icone_etapa2.style.color = "orange";

        icone_etapa1.className = "bi bi-1-circle fs-3";
        icone_etapa1.style.color = "white";
        texto_icone_etapa1.style.color = "white";
    }
}

function verificarPassagemEtapa(){
    // Dados pessoais
    nome_user.dispatchEvent(new Event("change"));
    email_user.dispatchEvent(new Event("change"));
    cpf_user.dispatchEvent(new Event("change"));
    erro_cpf_formato.dispatchEvent(new Event("change"));
    ddd_user.dispatchEvent(new Event("change"));
    telefone_user.dispatchEvent(new Event("change"));
    senha_user.dispatchEvent(new Event("change"));
    confirmar_senha.dispatchEvent(new Event("change"));
    dataNasc_user.dispatchEvent(new Event("change"));

    const erros = [
        erro_nome, 
        erro_email,
        erro_cpf_formato, 
        erro_cpf, 
        erro_ddd,
        erro_telefone, 
        erro_senha_fraca, 
        erro_senha_tamanho, 
        erro_confirmar,
        erro_dataNasc_user
    ];

    // Verifica se algum elemento está com display block
    const temErro = erros.some(erro => erro.style.display === "block");
    
    if(temErro){
        return false
    } else {
        alterarEtapa(2)
    }
}

// Bloquear envio de formulário se houver campos inválidos
botao_cadastrar.addEventListener("click", (e) => {

    nome_rua.dispatchEvent(new Event("change"));
    nome_bairro.dispatchEvent(new Event("change"));
    nome_cidade.dispatchEvent(new Event("change"));
    nome_estado.dispatchEvent(new Event("change"));
    cep_endereco.dispatchEvent(new Event("change"));

    const erros = [
        erro_nome_rua,
        erro_nome_bairro,
        erro_nome_cidade,
        erro_nome_estado,
        erro_cep_endereco
    ];

    const temErro = erros.some(
        erro => erro.style.display === "block"
    );

    if (temErro) {
        e.preventDefault();
    }
});