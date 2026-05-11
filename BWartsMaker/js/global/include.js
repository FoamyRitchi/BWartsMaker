// Retorna o caminho relativo baseado na profundidade da página
function getRelativePart() {
    // Caminho atual da URL
    const path = window.location.pathname;
    // Procura a página "pages"
    const pagesIndex = path.indexOf('/pages/');
    
    // Verifica existe "pages", se não, retorna uma string vazia
    if (pagesIndex === -1) return '';

    // Pega tudo que vem depois de pages
    const afterPages = path.slice(pagesIndex + '/pages/'.length);
    // Conta quantos níveis de pasta existem
    const depth = afterPages.split('/').length - 1;
    
    // Retorna "../" para cada nível
    return '../'.repeat(depth);
}

// Inserir os elementos do head
function inserirHead(data, baseUrl) {
    // Cria parse HTML
    const parser = new DOMParser();
    // Converte o parse em documento
    const doc = parser.parseFromString(data, 'text/html');

    // Junta head e body
    const headElements = Array.from(doc.head.children).concat(Array.from(doc.body.children));

    // Adiciona os elementos ao head
    headElements.forEach(element => {
        document.head.appendChild(element.cloneNode(true));
    });
}

// Função para incluir o head nas próximas páginas
function incluirHead() {
    // Caminho relativo do arquivo
    const headPath = getRelativePart() + 'global/head.html';
    // URL absoluta base
    const headUrl = new URL(headPath, window.location.href).href;

    // Busca o arquivo
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

// Executa a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', incluirHead);
