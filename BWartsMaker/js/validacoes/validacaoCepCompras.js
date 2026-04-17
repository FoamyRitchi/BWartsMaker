let cep = document.getElementById("cep");
let erro_cep = document.getElementById("erro_cep");
let erro_cep_tamanho = document.getElementById("erro_cep_tamanho");

erro_cep.style.textContent = " ";

// Permitir que o usuário digite apenas números para digitar o cep.
cep.addEventListener("input", () =>{
    const cepFiltrado = cep.value.replace(/[^0-9]/g, "");

    if(cep.value !== cepFiltrado){
        erro_cep.textContent = "ERRO: Digite apenas números para informar o CEP.";
    } else {
        erro_cep.textContent = " ";
    }

    cep.value = cepFiltrado;
});

// Pedir ao usuário digitar apenas 8 números para informar o CEP
cep.addEventListener("change", () => {
    if(cep.value.length !== 8){
        erro_cep_tamanho.textContent = "ERRO: CEP deve ter 8 números.";
    } else {
        erro_cep_tamanho.textContent = " ";
    } 
});