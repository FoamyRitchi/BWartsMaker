// Etapa1 - Dados pessoais
const etapa1 = document.getElementById("etapa1");
const icone1 = document.getElementById("iconeEtapa1");
const textoIconeEtapa1 = document.getElementById("textoIconeEtapa1");

// Etapa2 - Endereço
const etapa2 = document.getElementById("etapa2");
const icone2 = document.getElementById("iconeEtapa2");
const textoIconeEtapa2 = document.getElementById("textoIconeEtapa2");

// Botão para passar etapa
const botaoPassarEtapa = document.getElementById("botaoPassarEtapa");
const botaoVoltarEtapa = document.getElementById("botaoVoltarEtapa");

// Botão para confirmar cadastro
const botaoConfirmar = document.getElementById("botaoConfirmar");

alterarEtapa(1);

botaoPassarEtapa.addEventListener("click", () => {
    alterarEtapa(2);
})

botaoVoltarEtapa.addEventListener("click", () => {
    alterarEtapa(1);
})

function alterarEtapa(etapa){
    // Dados pessoais
    if(etapa === 1) {
        // Mostrar formulário de dados pessoais
        etapa1.style.display = "block";
        etapa2.style.display = "none";

        icone1.className = "bi bi-1-circle-fill fs-3";
        icone1.style.color = "orange";
        textoIconeEtapa1.style.color = "orange";
        
        icone2.className = "bi bi-2-circle fs-3";
        icone2.style.color = "white";
        textoIconeEtapa2.style.color = "white";
    // Endereço 
    } else if (etapa === 2) {
        // Mostrar formulário de endereço
        etapa2.style.display = "block";
        etapa1.style.display = "none";

        icone2.className = "bi bi-2-circle-fill fs-3";
        icone2.style.color = "orange";
        textoIconeEtapa2.style.color = "orange";

        icone1.className = "bi bi-1-circle fs-3";
        icone1.style.color = "white";
        textoIconeEtapa1.style.color = "white";
    }
}