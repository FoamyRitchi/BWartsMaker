// Variáveis para cada elemento do carrossel
const elemSlides = document.querySelector(".carrossel__slides");
const elemImagens = document.querySelectorAll(".carrossel__slides__img");
const elemBotaoEsquerdo = document.querySelector(".carrossel__botao__esquerdo");
const elemBotaoDireito = document.querySelector(".carrossel__botao__direito");

// Variáveis da posição do carrossel principal e quanto deve ser o movimento executado
let index = 0;
let movimento = -100;

//Função do botão esquerdo, quando clicado move para o slide anterior, caso seja o primeiro slide, ele vai para o último
elemBotaoEsquerdo.addEventListener("click", () => {
    index--;

    if(index < 0){
        index = elemImagens.length - 1;
    }
    atualizarCarrossel();
});

//Função do botão direito, quando clicado move para o slide posterior, caso seja o último slide, ele vai para o primeiro
elemBotaoDireito.addEventListener("click", () => {
    index++;

    if(index == elemImagens.length){
        index = 0;
    }
    atualizarCarrossel();
});

// Função que realiza o movimento no slide, para frente ou para trás
const atualizarCarrossel = () => {
    elemSlides.style.transform = `translateX(${index * movimento}%)`;
};

// Função que realiza o movimento do slide automaticamente, a cada 3 segundos
setInterval(() => {
    index++;

    if(index == elemImagens.length){
        index = 0;
    }
    atualizarCarrossel();
 }, 3000); 