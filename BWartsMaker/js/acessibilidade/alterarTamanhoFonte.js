// Capturando os botões de aumentar e diminuir a fonte
const aumentarFonte = document.getElementById("aumentar_fonte");
const diminuirFonte = document.getElementById("diminuir_fonte");
const retomarFonte = document.getElementById("retomar_fonte");

// Configurações do limite de tamanho da fonte
let tamanhoInicial = 16;
let tamanhoMaximo = 34;
let tamanhoMinimo = 8;
// Quantidade de pixels que a fonte vai aumentar a cada click no botão
let passo = 6;

// Tamanho atual da fonte
let tamanhoAtual = tamanhoInicial;

// Retomar a fonte ao tamanho original
retomarFonte.addEventListener("click", () => {
    tamanhoAtual = tamanhoInicial;

    aplicarTamanho(tamanhoAtual);    
});

// Aumentar fonte
aumentarFonte.addEventListener("click", () => {
    if(tamanhoAtual < tamanhoMaximo){
        tamanhoAtual += passo;
        
        aplicarTamanho(tamanhoAtual);
    }  
});

// Diminuir fonte
diminuirFonte.addEventListener("click", () => {
    if(tamanhoAtual > tamanhoMinimo){
        tamanhoAtual -= passo / 2;
        
        aplicarTamanho(tamanhoAtual);
    } 
});

// Aplica o tamanho salvo no sistema
function aplicarTamanho(tamanho){
    document.documentElement.style.fontSize = `${tamanho}px`;
    localStorage.setItem('tamanhoFonte', tamanhoAtual);
}

// Recupera a fonte salva e aplica
function restaurarTamanhoFonte(){
    const tamanhoSalvo = parseInt(localStorage.getItem('tamanhoFonte'));

    // Verifica se existe valor salvo
    if(tamanhoSalvo){
        tamanhoAtual = tamanhoSalvo;
        aplicarTamanho(tamanhoAtual);
    }
}

restaurarTamanhoFonte();