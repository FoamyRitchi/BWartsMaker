// Elementos
const sidebar = document.getElementById("sidebar");
const botao_recolher_menu = document.getElementById("botao_recolher_menu");
const sidebar_icone = document.getElementById("sidebar_icone");

// Botões
const sair_conta = document.getElementById("botao_sair_conta");
const cancelar_saida = document.getElementById("cancelar_saida");
const fechar_modal = document.getElementById("fechar_modal");

// Recolher sidebar
botao_recolher_menu.addEventListener("click", () => {
    sidebar.classList.toggle("recolhida");
    atualizarIcone();
});

// Sair da conta
sair_conta.addEventListener("click", () => {
    window.location.href = "../../forms/form_login.html";
})

// Cancelar saída da conta
cancelar_saida.addEventListener("click", () => {
    fechar_modal.dispatchEvent(new Event("click"));
})


// Animação do ícone de recolher menu
function atualizarIcone() {
    if (sidebar.classList.contains("recolhida")) {
        sidebar_icone.className = "bi bi-chevron-right";
    } else {
        sidebar_icone.className = "bi bi-chevron-left";
    }
}

// Recolher menu automaticamente quando atingir tela de tablet
function recolherMenuAutomatico() {
    if (window.innerWidth < 1025) {
        sidebar.classList.add("recolhida");
    } else {
        sidebar.classList.remove("recolhida");
    }
    atualizarIcone();
}

recolherMenuAutomatico();
window.addEventListener("resize", recolherMenuAutomatico);