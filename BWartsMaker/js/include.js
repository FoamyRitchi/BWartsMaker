// Função para incluir o head nas próximas páginas
function incluirHead() {
    // Chama o arquivo head.html para as páginas
    fetch('../front/head.html')
        .then(response => response.text())
        .then(data => {
            // Insere o conteúdo dentro do <head> existente
            document.head.insertAdjacentHTML('beforeend', data);
        })
        // Mensagem de erro caso aconteça algo inesperado
        .catch(error => console.error('Erro ao carregar o head:', error));
}

// Executa a função quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", incluirHead);