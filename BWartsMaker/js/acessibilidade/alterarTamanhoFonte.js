// Selecionando todos os inputs com o name Tamanho_fonte
const selecaoTamanhoFonte = document.querySelectorAll('input[name="tamanho_fonte"]');

// Percorrendo os inputs e verificando qual está selecionado
selecaoTamanhoFonte.forEach(opc => {
    opc.addEventListener("click", () => {
        if(opc.value === "tamanho_padrao"){
            document.body.style.fontSize = "16px";
            console.log("padrao");
        }
        
        if(opc.value === "tamanho_grande"){
            document.body.style.fontSize = "24px";
            console.log("big");
        }   

        if(opc.value === "tamanho_extra_grande"){
            document.body.style.fontSize = "32px";
            console.log("bigbig");
        }
    });
});