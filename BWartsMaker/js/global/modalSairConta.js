// Exibir o modal para sair da conta do usuário através da injeção de modal
function exibirModalSairConta(){
    const modalHTML = document.createElement("div");
    modalHTML.classList.add("modal", "fade")
    modalHTML.setAttribute("tabindex", "-1")

    // Criação do HTML do modal
    modalHTML.innerHTML = `
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">

                <!-- Header do modal -->
                <div class="modal-header fundo__escuro">
                    <div class="d-flex justify-content-center modal-body">
                        <img src="../../../img/assets/Logo.svg" alt="Logo da BWarts" style="width: 13rem;">
                    </div>
                    <button id="fechar_modal_sair_conta" type="button" class="btn-close" data-bs-theme="dark" data-bs-dismiss="modal"></button>
                </div>
                
                <!-- Corpo do modal -->
                <div class="modal-body d-flex flex-column align-items-center text-center px-4 py-4 gap-3">
                    <!-- Ícone -->
                    <div class="rounded-circle d-flex align-items-center justify-content-center"
                        style="width:72px; height:72px; background:#fff5e6; border: 2px solid #FF8E1C;">
                        <i class="bi bi-box-arrow-right" style="font-size:2rem; color:#FF8E1C;"></i>
                    </div>

                    <!-- Texto -->
                    <div>
                        <h1 class="fw-bold mb-1 fs-4" style="color:#222;">
                            Sair da conta?
                        </h1>
                    </div>

                    <!-- Botões de confirmação -->
                    <div class="modal-body">
                        <button id="cancelar_saida" type="button" class="btn btn-outline-danger"><i class="bi bi-x-circle-fill"></i> Cancelar</button>
                        <button id="botao_sair_conta" type="button" class="btn btn-success" data-bs-dismiss="modal"><i class="bi bi-check-circle-fill"></i> Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    `

    // Colocar o HTML no arquivo
    document.body.appendChild(modalHTML);

    const botao_sair_conta = document.getElementById("botao_sair_conta");
    const botao_cancelar_saida = document.getElementById("cancelar_saida");
    const fechar_modal = document.getElementById("fechar_modal_sair_conta");

    // Criar modal
    const modal = new bootstrap.Modal(modalHTML);
    modal.show();

    // Confirmar saída da conta
    botao_sair_conta.addEventListener("click", () => {
        window.location.href = "../../forms/form_login.html";
    });

    // Cancelar saída da conta
    botao_cancelar_saida.addEventListener("click", () => {
        fechar_modal.dispatchEvent(new Event("click"));
    })
    
    // Limpar HTML após fechar modal
    modalHTML.addEventListener('hidden.bs.modal', () => {
        modal.dispose();
        modalHTML.remove();
    });
}