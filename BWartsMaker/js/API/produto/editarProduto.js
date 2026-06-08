async function carregarProduto() {

    const params = new URLSearchParams(
        window.location.search
    );

    const id_prod = params.get("id");

    if (!id_prod) return;

    const response = await fetch(
        `${API}/api/produtos/${id_prod}`
    );

    const produto = await response.json();

    preencherFormulario(produto);
}



function preencherFormulario(produto) {
    const campoId = document.getElementById("id_prod");

    if (campoId) {
        campoId.value = produto.id_prod ?? "";
    }
    // Dados pessoais
    document.getElementById("id_prod").value =
        produto.id_prod ?? "";

    document.getElementById("nome_prod").value =
        produto.nome_prod ?? "";

    document.getElementById("categoria_prod").value =
        produto.categoria_prod ?? "";

    document.getElementById("valor_prod").value =
        produto.valor_prod ?? "";

    document.getElementById("img_prod").value =
        produto.img_prod ?? "";

    // Telefone
    document.getElementById("qntd_prod").value =
        produto.qntd_prod ?? "";
}

window.addEventListener("DOMContentLoaded", () => {


    carregarProduto();
});