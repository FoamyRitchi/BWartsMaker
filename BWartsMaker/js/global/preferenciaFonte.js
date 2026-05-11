const fonteSelecionada = localStorage.getItem('fonteSelecionada');

if (fonteSelecionada) {
    document.documentElement.style.fontFamily = fonteSelecionada;
    document.documentElement.style.setProperty('--bs-body-font-family', fonteSelecionada);
    document.documentElement.style.setProperty('--bs-font-sans-serif', fonteSelecionada);

    if (document.body) {
        document.body.style.fontFamily = fonteSelecionada;
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.fontFamily = fonteSelecionada;
        });
    }
}
