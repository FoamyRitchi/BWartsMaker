// Variáveis para cada elemento do carrossel
const elemSlidesCards = document.querySelectorAll(".cards__slides__container");
// Todos os conjuntos de 5 produtos
const elemImagensCards = document.querySelectorAll(".cards__slides__container__produtos");
// Pegando todos os botões pelo ID
const botoesDireita = document.querySelectorAll("#botao__direito__cards");
const botoesEsquerda = document.querySelectorAll("#botao__esquerdo__cards");
// Movimento que o slide vai fazer, no caso, 100%
const moviment = -100;

// Index das sessões novidade, e pesquisas
let iNovidades = 0;
let iPesquisas = 0;
// Arrays com os cards das sessões
let sessaoNovidades = [elemImagensCards[0], elemImagensCards[1], elemImagensCards[2]];
let sessaoPesquisas = [elemImagensCards[3], elemImagensCards[4], elemImagensCards[5]];
let indexDoBotaoEsquerdo, indexDoBotaoDireito;

// Identificar e realizar o movimento dos botões esquerdo das sessões com carrossels de produtos
botoesEsquerda.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        // Move a sessão das novidades
        if (index === 0) {
            iNovidades--;
            if (iNovidades < 0) {
                iNovidades = sessaoNovidades.length - 1;
            }
            // Move a sessão das pesquisas
        } else if (index === 1) {
            iPesquisas--;
            if (iPesquisas < 0) {
                iPesquisas = sessaoPesquisas.length - 1;
            }
        }
        
        atualizarCards();
    });
});

// Identificar e realizar o movimento dos botões direitos das sessões com carrossels de produtos
botoesDireita.forEach((botao, index) => {
        botao.addEventListener("click", () => {
            if (index === 0) {
                iNovidades++;
                if (iNovidades >= sessaoNovidades.length) {
                    iNovidades = 0;
                }
            } else if (index === 1) {
                iPesquisas++;
                if (iPesquisas >= sessaoPesquisas.length) {
                    iPesquisas = 0;
                }
            }

            atualizarCards();
        });
});

// Realiza o movimento das sessões com os cards
const atualizarCards = () => {
        elemImagensCards[0].style.transform = `translateX(${iNovidades * moviment}%)`;
        elemImagensCards[3].style.transform = `translateX(${iPesquisas * moviment}%)`;
};