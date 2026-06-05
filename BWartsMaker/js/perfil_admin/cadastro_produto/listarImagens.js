const input = document.getElementById('input_imagem');
const lista = document.querySelector('.input__imagem__lista');

let arquivosAtivos = [];

input.addEventListener('change', () => {
    // Criando array com imagens
    const arquivos = Array.from(input.files);

    arquivos.forEach(arquivo => {
        // Lendo imagem
        const reader = new FileReader();

        reader.onload = (e) => {
            // Adiciona o arquivo ao array de ativos
            arquivosAtivos.push(arquivo);

            // Cria div para por imagem
            const item = document.createElement('figure');
            item.classList.add('input__imagem__item');

            // Cria imagem dentro da div
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = arquivo.name;

            // Botão de remoção de imagem
            const btn = document.createElement('button');
            btn.textContent = '×';
            btn.title = 'Remover imagem';
            btn.addEventListener('click', () => {
                // Remove do array ao clicar em ×
                arquivosAtivos = arquivosAtivos.filter(f => f !== arquivo);
                item.remove();
            });

            // Organiza a imagem e o botão dentro da div
            item.appendChild(img);
            item.appendChild(btn);
            lista.appendChild(item);
        };

        reader.readAsDataURL(arquivo);
    });

    input.value = '';
});

// Teste: Visualizar arquivos que estõ sendo enviados
document.getElementById('botao_cadastrar_produto').addEventListener('click', () => {
    console.log('Arquivos a enviar:', arquivosAtivos);
});