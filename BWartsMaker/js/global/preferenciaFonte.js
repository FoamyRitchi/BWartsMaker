// Pega a seleção de fonte que está aplicada no momento
const fonteSalva = localStorage.getItem("fonte");

// Aplicar a fonte selecionada ao site todo
if(fonteSalva === "fonte_padrao"){
    document.body.style.fontFamily = "sans-serif";
} else if(fonteSalva === "fonte_serifada"){
    document.body.style.fontFamily = "Times New Roman";
} if(fonteSalva === "fonte_dyslexic"){
    document.body.style.fontFamily = "OpenDyslexic";
} 

// Marca, na página de seleção, qual a opção está selecionada
const fonteSelecionada = document.querySelector(`input[value="${fonteSalva}"]`);
if(fonteSelecionada) {
    fonteSelecionada.checked = true;
}