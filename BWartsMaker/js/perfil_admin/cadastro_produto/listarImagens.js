const input = document.getElementById("input_imagem");
const lista = document.querySelector(".input__imagem__lista");

// disponível para outros arquivos JS
window.arquivosAtivos = [];

input.addEventListener("change", () => {
    const novosArquivos = Array.from(input.files);

    // Criando elemento de imagem pequena para cada arquivo selecionado
    novosArquivos.forEach((arquivo) => {
        window.arquivosAtivos.push(arquivo);

        const reader = new FileReader();

        // Criação das imagem-componente
        reader.onload = (e) => {
            const item = document.createElement("figure");

            item.classList.add("input__imagem__item");

            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = arquivo.name;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "×";
            btn.title = "Remover imagem";

            // Remover arquivo da lista
            btn.addEventListener("click", () => {
                window.arquivosAtivos = window.arquivosAtivos.filter( arquivoAtual => arquivoAtual !== arquivo);
                item.remove();
            });

            // Adicionadno 
            item.appendChild(img);
            item.appendChild(btn);
            lista.appendChild(item);
        };

        reader.readAsDataURL(arquivo);
    });
});