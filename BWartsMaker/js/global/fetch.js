//Adição de header e footer nas páginas de diferentes níveis de pasta

// Calcula quantos "../" são necessários
function getRelativePart() {
    // Caminho atual da URL
    const path = window.location.pathname;
    // Procura "/pages/"
    const pagesIndex = path.indexOf('/pages/');

    // Se não existir, retorna vazio
    if (pagesIndex === -1) {
        return '';
    }

    // Pega tudo após "/pages/"
    const afterPages = path.slice(pagesIndex + '/pages/'.length);
    // Conta a profundidade de pastas
    const depth = afterPages.split('/').length - 1;
    // Retorna "../" para cada nível
    return '../'.repeat(depth);
}

// Corrige caminhos relativos do HTML carregado
function resolveRelativeFragmentPaths(html, baseUrl) {
    // Cria parse do HTML
    const parser = new DOMParser();
    // Converte a string HTML em documento
    const doc = parser.parseFromString(html, 'text/html');

    // Seleciona elementos com href e src
    const elements = Array.from(doc.querySelectorAll('link[href], script[src], img[src], a[href], source[src], video[src]'));
    
    elements.forEach(el => {
        // Descobre se usa href ou src
        const attr = el.hasAttribute('href') ? 'href' : 'src';
        // Obtém valor do atributo
        const value = el.getAttribute(attr);
        
        // Ignora valores vazios
        if (!value) return;
        
        // Ignora URLs absolutas e âncoras
        if (/^(?:[a-zA-Z][a-zA-Z\d+-.]*:|\/\/|#)/.test(value)) return;

        try {
            // Converte caminho relativo em absoluto
            el.setAttribute(attr, new URL(value, baseUrl).href);
        } catch (error) {
            console.warn('Falha ao resolver caminho:', value, error);
        }
    });

    // Retona o HTML corrigido
    return doc.body.innerHTML;
}

// Carrega um fragmento HTML e executa seus scripts
function carreagarHeadComScripts(url, targetId) {
    // Cria URL absoluta
    const baseUrl = new URL(url, window.location.href).href;
    // Elemento alvo
    const target = document.getElementById(targetId);

    // Se não existir, cancela
    if (!target) return;

    // Busca o arquivo HTML
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ${response.status} ao carregar ${url}`);
            return response.text();
        })
        .then(data => {
            // Corrige caminhos relativos
            const normalizedData = resolveRelativeFragmentPaths(data, baseUrl);
            // Cria parser HTML
            const parser = new DOMParser();
            // Transforma o HTML em documento
            const doc = parser.parseFromString(normalizedData, 'text/html');

            // Captura os scripts do HEAD
            const scripts = Array.from(doc.querySelectorAll('script'));
            // Conteúdo HTML
            const contentWithoutScripts = doc.body.innerHTML;

            // Insere o HTML na página
            target.innerHTML = contentWithoutScripts;

            // Recria os scripts manualmente
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                if (script.defer) newScript.defer = true;
                document.head.appendChild(newScript);
            });
        })
        .catch(error => console.error('Erro ao carregar:', error));
}

// Carrega header e footer
function carregarPartesGlobais() {
    // Caminho relativo base
    const base = getRelativePart();

    // Carregar header
    carreagarHeadComScripts(base + 'header/header.html', 'header');
    // Carregar footer
    carreagarHeadComScripts(base + 'footer/footer.html', 'footer');
}

// Executa o DOM quando estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarPartesGlobais);
} else {
    carregarPartesGlobais();
}
