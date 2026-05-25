const imagensPequenas = document.querySelectorAll('.produto__imagem');
const imagemPrincipal = document.querySelector('.produto__imagem__principal img');

imagensPequenas.forEach(img => {
    img.addEventListener('click', () => {
        // Atualiza a imagem principal
        imagemPrincipal.src = img.src;
        imagemPrincipal.alt = img.alt;

        // Remove a borda laranja de todas as imagens
        imagensPequenas.forEach(i => i.classList.remove("selecionada"));

        // Adiciona a borda laranja na imagem selecionada
        img.classList.add("selecionada");
    });
});

if (imagensPequenas.length > 0) {
    imagensPequenas[0].classList.add("selecionada");
}