// Etapa1 - Dados pessoais
const etapa1 = document.getElementById("etapa1");
const icone_etapa1 = document.getElementById("icone_etapa1");
const texto_icone_etapa1 = document.getElementById("texto_icone_etapa1");

// Etapa2 - Endereço
const etapa2 = document.getElementById("etapa2");
const icone_etapa2 = document.getElementById("icone_etapa2");
const texto_icone_etapa2 = document.getElementById("texto_icone_etapa2");

// Botão para passar etapa
const botao_proxima_etapa = document.getElementById("botao_proxima_etapa");
const botao_voltar_etapa = document.getElementById("botao_voltar_etapa");

alterarEtapa(1);

botao_proxima_etapa.addEventListener("click", () => {
    alterarEtapa(2);
})

botao_voltar_etapa.addEventListener("click", () => {
    alterarEtapa(1);
})

function alterarEtapa(etapa){
    // Dados pessoais
    if(etapa === 1) {
        // Mostrar formulário de dados pessoais
        etapa1.style.display = "block";
        etapa2.style.display = "none";

        icone_etapa1.className = "bi bi-1-circle-fill fs-3";
        icone_etapa1.style.color = "orange";
        texto_icone_etapa1.style.color = "orange";
        
        icone_etapa2.className = "bi bi-2-circle fs-3";
        icone_etapa2.style.color = "white";
        texto_icone_etapa2.style.color = "white";
    // Endereço 
    } else if (etapa === 2) {
        // Mostrar formulário de endereço
        etapa2.style.display = "block";
        etapa1.style.display = "none";

        icone_etapa2.className = "bi bi-2-circle-fill fs-3";
        icone_etapa2.style.color = "orange";
        texto_icone_etapa2.style.color = "orange";

        icone_etapa1.className = "bi bi-1-circle fs-3";
        icone_etapa1.style.color = "white";
        texto_icone_etapa1.style.color = "white";
    }
}