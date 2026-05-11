function getRelativePart() {
    const path = window.location.pathname;
    const pagesIndex = path.indexOf('/pages/');

    if (pagesIndex === -1) return '';

    const afterPages = path.slice(pagesIndex + '/pages/'.length);
    const depth = afterPages.split('/').length - 1;

    return '../'.repeat(depth);
}

function resolverCaminhosRelativos(doc, baseUrl) {
    const elementos = Array.from(doc.querySelectorAll('link[href], script[src], img[src], a[href], source[src], video[src]'));

    elementos.forEach(elemento => {
        const atributo = elemento.hasAttribute('href') ? 'href' : 'src';
        const valor = elemento.getAttribute(atributo);

        if (!valor) return;
        if (/^(?:[a-zA-Z][a-zA-Z\d+-.]*:|\/\/|#)/.test(valor)) return;

        elemento.setAttribute(atributo, new URL(valor, baseUrl).href);
    });
}

function copiarAtributos(origem, destino) {
    Array.from(origem.attributes).forEach(atributo => {
        destino.setAttribute(atributo.name, atributo.value);
    });
}

function adicionarElementoAoHead(elemento) {
    if (elemento.tagName === 'TITLE') {
        document.title = elemento.textContent;
        return;
    }

    if (elemento.tagName === 'LINK' && elemento.href) {
        const linkJaIncluido = Array.from(document.querySelectorAll('link[href]')).some(link => link.href === elemento.href);
        if (linkJaIncluido) return;
    }

    if (elemento.tagName === 'SCRIPT') {
        const scriptJaIncluido = elemento.src
            && Array.from(document.querySelectorAll('script[src]')).some(script => script.src === elemento.src);

        if (scriptJaIncluido) return;

        const novoScript = document.createElement('script');
        copiarAtributos(elemento, novoScript);
        novoScript.textContent = elemento.textContent;
        document.head.appendChild(novoScript);
        return;
    }

    document.head.appendChild(elemento.cloneNode(true));
}

function inserirHead(data, baseUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    resolverCaminhosRelativos(doc, baseUrl);

    const headElements = Array.from(doc.head.children).concat(Array.from(doc.body.children));
    headElements.forEach(elemento => adicionarElementoAoHead(elemento));
}

function incluirHead() {
    const headPath = getRelativePart() + 'global/head.html';
    const headUrl = new URL(headPath, window.location.href).href;

    fetch(headPath)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ${response.status} ao carregar ${headPath}`);
            return response.text();
        })
        .then(data => {
            inserirHead(data, headUrl);
        })
        .catch(error => console.error('Erro ao carregar o head:', error));
}

document.addEventListener('DOMContentLoaded', incluirHead);
