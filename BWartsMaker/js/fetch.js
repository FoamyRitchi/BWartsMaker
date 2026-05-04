//Adição de header e footer nas páginas
function carreagarHeadComScripts(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Parseia o HTML para tratar o HTML como um documento
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Captura os scripts e o conteúdo sem os scripts
            const scripts = Array.from(doc.querySelectorAll('script'));
            const contentWithoutScripts = doc.body.innerHTML;

            // Insere o conteúdo sem os scripts
            document.getElementById(targetId).innerHTML = contentWithoutScripts;

            // Executa os scripts
            scripts.forEach(script => {
                // Cria uma tag script no HTML, para cada script encontrado 
                const newScript = document.createElement('script');
                
                // Verifica se o script tem um src
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                
                // Verifica se o script tem o defer como atributo
                if (script.defer) newScript.defer = true;

                // Adiciona ao head o novo script, para que ele seja executado 
                document.head.appendChild(newScript);
            });
        })
        // Verifica se hoube algum erro no carregamento do arquivo
        .catch(error => console.error('Erro ao carregar:', error));
}

carreagarHeadComScripts("header.html", "header");
carreagarHeadComScripts("footer.html", "footer");