// Variáveis para cada elemento do carrossel
const elemSlidesCards = document.querySelector(".cards__slides__container");
const elemImagensCards = document.querySelectorAll(".cards__slides__container__produtos");
const elemBotaoDireitoCards = document.querySelector(".cards__botao__direito__cards");
const elemBotaoEsquerdoCards = document.querySelector(".cards__botao__esquerdo__cards");

// Variáveis da posição do carrossel principal e quanto deve ser o movimento executado
let indeX = 0;
let moviment = -100;

//Função do botão esquerdo, quando clicado move para o slide anterior, caso seja o primeiro slide, ele vai para o último
elemBotaoEsquerdoCards.addEventListener("click", () => {
    indeX--;
    
    if(indeX < 0){
        indeX = elemImagensCards.length - 1;
    }
    atualizarCards();
});

//Função do botão direito, quando clicado move para o slide posterior, caso seja o último slide, ele vai para o primeiro
elemBotaoDireitoCards.addEventListener("click", () => {
    indeX++;

    if(indeX == elemImagensCards.length){
        indeX = 0;
    }
    atualizarCards();
});

// Função que realiza o movimento no slide, para frente ou para trás
const atualizarCards = () => {
    elemSlidesCards.style.transform = `translateX(${indeX * moviment}%)`;
};