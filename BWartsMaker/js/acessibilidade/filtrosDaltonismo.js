function aplicarDaltonismo(modo) {
    const html = document.documentElement;

    if (modo === 'normal' || html.dataset.daltonismo === modo) {
        delete html.dataset.daltonismo;
        localStorage.removeItem('daltonismo');
    } else {
        html.dataset.daltonismo = modo;
        localStorage.setItem('daltonismo', modo);
    }
}

// Restaura preferência salva ao carregar a página
const salvo = localStorage.getItem('daltonismo');
if (salvo) document.documentElement.dataset.daltonismo = salvo;