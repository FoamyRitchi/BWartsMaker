// Selecionando todos os inputs com o name Tamanho_fonte
const selecaoTamanhoFonte = document.querySelectorAll('input[name="tamanho_fonte"]');
// Seleciona todos os documentos html
document.documentElement = "html";

// Percorrendo os inputs e verificando qual está selecionado
selecaoTamanhoFonte.forEach(opc => {
    opc.addEventListener("change", () => {
        if(opc.value === "tamanho_padrao"){
            document.documentElement.style.fontSize = "16px";
        }
        
        if(opc.value === "tamanho_grande"){
            document.documentElement.style.fontSize = "24px";
        }   

        if(opc.value === "tamanho_extra_grande"){
            document.documentElement.style.fontSize = "32px";
        }
    });
});