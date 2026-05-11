// Objeto com as fontes que o sistema pode alterar
const fontesDisponiveis = {
    fonte_padrao: 'sans-serif',
    fonte_serifada: "Times New Roman",
    fonte_open: "OpenDyslexic"
};

// Função para aplicar as fontes
function aplicarFonte(fonte) {
    document.documentElement.style.fontFamily = fonte;
    // Alterando as fontes do sistema através do bootstrap, para não haver conflito
    document.documentElement.style.setProperty('--bs-body-font-family', fonte);
    document.documentElement.style.setProperty('--bs-font-sans-serif', fonte);

    // Aplicando a fonte passada como parâmetro no body
    if (document.body) {
        document.body.style.fontFamily = fonte;
    }

    // Salvando a fonte escolhida
    localStorage.setItem('fonteSelecionada', fonte);
}

// Recupera a fonte salva e aplica
function restaurarFonteSalva() {
    const fonteSalva = localStorage.getItem('fonteSelecionada');

    // Verifica se existe valor salvo
    if (fonteSalva) {
        aplicarFonte(fonteSalva);
    }
}

// Identifica quando e qual botão foi clicado
document.addEventListener('click', event => {
    const botaoFonte = event.target.closest('#fonte_padrao, #fonte_serifada, #fonte_open');

    // Caso não tenha clicado em algum botão válido
    if (!botaoFonte) return;

    // Aplicando a fonte de acordo com o ID identificado
    aplicarFonte(fontesDisponiveis[botaoFonte.id]);
});

// Verifica se o HTML já carregou
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restaurarFonteSalva);
} else {
    restaurarFonteSalva();
}
