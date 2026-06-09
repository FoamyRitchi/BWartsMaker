// Botões do formulário e do modal
const botao_confirmar_cadastro = document.getElementById("botao_modal_confirmar_cadastro_produto");
const botao_modal_cancelar_cadastro = document.getElementById("botao_modal_cancelar_cadastro_produto");
const botao_modal_cancelar_edicao_produto = document.getElementById("botao_modal_cancelar_edicao_produto");
const botao_cancelar_cadastro = document.getElementById("botao_cancelar_cadastro");
const botao_fechar_modal = document.getElementById("fechar_modal_confimar_cadastro_produto");

const modal = document.getElementById("modal_confirmar_cadastro_produto");

const formulario_cadastro_produto = document.getElementById("form_cadastrar_produto");


// Cancelar cadastro do produto pelo modal
botao_modal_cancelar_cadastro.addEventListener("click", () =>{
    atualizarModal("bi-file-earmark-x", "Cadastro de produto cancelado.")
    limparFormulario();
});

// Cancelar cadastro do produto pelo formulário
botao_cancelar_cadastro.addEventListener("click", () => {
    limparFormulario();
})

// Confirmar cadastro do produto pelo modal
botao_confirmar_cadastro.addEventListener("click", () => {
    atualizarModal("bi-clipboard2-check", "Cadastro de produto realizado com sucesso!")
})

// Deixar o modal normal novamente
botao_fechar_modal.addEventListener("click", () => {
    atualizarModal("bi-clipboard2-check", "Confirmar cadastro de produto")
})

.addEventListener("click", () => {
    atualizarModal("bi-clipboard2-check", "Confirmar edição de produto")
})

function atualizarModal(classe_icone, texto_modal) {
    const icone_modal = modal.querySelector(".bi")
    const titulo_modal = modal.querySelector("h1")

    icone_modal.className = `bi ${classe_icone}`;
    titulo_modal.textContent = texto_modal

    if(botao_modal_cancelar_cadastro.checkVisibility() && botao_confirmar_cadastro.checkVisibility()){
        botao_modal_cancelar_cadastro.style.display = "none";
        botao_confirmar_cadastro.style.display = "none";        
    } else {
        botao_modal_cancelar_cadastro.style.display = "block";
        botao_confirmar_cadastro.style.display = "block";
    }
}

function limparFormulario(){
    const imagens_produto = document.querySelectorAll(".input__imagem__item");

    // Limpar os inputs do formulário
    formulario_cadastro_produto.reset();

    // Apagar imagens 
    imagens_produto.forEach(imagem => {
        const botao_fechar = imagem.querySelector("button")
        botao_fechar.dispatchEvent(new Event("click"));
    })
}