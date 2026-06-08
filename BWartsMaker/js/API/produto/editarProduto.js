async function carregarProduto() {

    try {

        const produtoSelecionado = JSON.parse(
            localStorage.getItem("produtoSelecionado")
        );

        if (!produtoSelecionado || !produtoSelecionado.id_user) {

            alert("Erro ao carregar produto.");

            window.location.href =
                "../cadastrar_produto/cadastrar_produto.html";

            return;
        }

        console.log("Produto selecionado:", produtoSelecionado);

        const response = await fetch(
            `${API}/api/usuarios/${produtoSelecionado.id_user}`
        );

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar produto (${response.status})`
            );
        }

        const produto = await response.json();

        console.log("Produto carregado:", produto);

        preencherFormulario(produto);

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao carregar produto.");
    }
}

function preencherFormulario(produto) {

    // Dados pessoais
    document.getElementById("id_prod").value =
        produto.id_prod ?? "";

    document.getElementById("nome_prod").value =
        produto.nome_prod ?? "";

    document.getElementById("categoria_prod").value =
        produto.categoria_prod ?? "";

    document.getElementById("valor_prod").value =
        produto.valor_prod ?? "";

    // Telefone
    document.getElementById("qntd_prod").value =
        produto.qntd_prod ?? "";
}