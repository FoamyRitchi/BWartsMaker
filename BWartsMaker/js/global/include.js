function getRelativePart() {
    const path = window.location.pathname;
    const pagesIndex = path.indexOf('/pages/');

    if (pagesIndex === -1) {
        return '';
    }

    const afterPages = path.slice(pagesIndex + '/pages/'.length);
    const depth = afterPages.split('/').length - 1;
    return '../'.repeat(depth);
}

function normalizeResourcePaths(html) {
    const base = getRelativePart();
    return html.replace(/(href|src)="(styles\/[^"']+|header\/[^"']+|footer\/[^"']+)"/g, (match, attr, value) => {
        return `${attr}="${base}${value}"`;
    });
}

// Função para incluir o head nas próximas páginas
function incluirHead() {
    const headPath = getRelativePart() + 'head.html';

    fetch(headPath)
        .then(response => response.text())
        .then(data => {
            const normalized = normalizeResourcePaths(data);
            document.head.insertAdjacentHTML('beforeend', normalized);
        })
        // Mensagem de erro caso aconteça algo inesperado
        .catch(error => console.error('Erro ao carregar o head:', error));
}

// Executa a função quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", incluirHead);