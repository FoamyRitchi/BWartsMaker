// Selecionando todos os inputs com o name = tipo_fonte
const selecaoFonte = document.querySelectorAll('input[name="tipo_fonte"]');

// Percorrendo todas as opções e verificando se foram clicadas
selecaoFonte.forEach(opc => {
    opc.addEventListener("click", () => {
        if(opc.value === "fonte_padrao"){
            document.body.style.fontFamily = "sans-serif";
        }
        
        if(opc.value === "fonte_serifada"){
            document.body.style.fontFamily = "Times New Roman";
        } 
        
        if(opc.value === "fonte_dyslexic"){
            document.body.style.fontFamily = "OpenDyslexic";
        }  
    });
});