// Capturando os botões de aumentar e diminuir a fonte
const aumentarFonte = document.getElementById("aumentar_fonte");
const diminuirFonte = document.getElementById("diminuir_fonte");
console.log(document.getElementById("aumentar_fonte"));

// Aumentar fonte
aumentarFonte.addEventListener("click", () => {
    alert("Aumenta");
});

// Diminuir fonte
diminuirFonte.addEventListener("click", () => {
    alert("Diminui");
});
