// Capturando os botões de aumentar e diminuir a fonte
const aumentarFonte = document.getElementById("aumentar_fonte");
const diminuirFonte = document.getElementById("diminuir_fonte");
const retomarFonte = document.getElementById("retomar_fonte");

// Configurações do limite de tamanho da fonte
let tamanhoInicial = 16;
let tamanhoMaximo = 48;
let tamanhoMinimo = 8;
// Quantidade de pixels que a fonte vai aumentar a cada click no botão
let passo = 6;

// Tamanho atual da fonte
let tamanhoAtual = tamanhoInicial;

// Retomar a fonte ao tamanho original
retomarFonte.addEventListener("click", () => {
    tamanhoAtual = 16;
    document.documentElement.style.fontSize = "16px"; 
});

// Aumentar fonte
aumentarFonte.addEventListener("click", () => {
    if(tamanhoAtual < tamanhoMaximo){
        tamanhoAtual += passo;
        document.documentElement.style.fontSize = tamanhoAtual + "px";
    }  
});

// Diminuir fonte
diminuirFonte.addEventListener("click", () => {
    if(tamanhoAtual > tamanhoMinimo){
        tamanhoAtual -= passo;
        document.documentElement.style.fontSize = tamanhoAtual + "px";
    } 
});
