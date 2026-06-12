// ── ESTADO ──────────────────────────────────────────────
const MAX_REMOVIDOS = 5;
let removidos = [];

// ── HELPERS ─────────────────────────────────────────────
function formatBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getQty(row) {
    return parseInt(row.querySelector('.qty-num').textContent);
}

function setQty(row, qty) {
    row.querySelector('.qty-num').textContent = qty;
}

function getPrecoUnitario(row) {
    return parseFloat(row.dataset.precoUnitario);
}

function getFrete(row) {
    return parseFloat(row.dataset.frete);
}

function calcTotalRow(row) {
    return getPrecoUnitario(row) * getQty(row) + getFrete(row);
}

// ── ATUALIZAR TOTAL GERAL ────────────────────────────────
function atualizarTotal() {
    const rows = document.querySelectorAll('#carrinho-tbody tr');
    let total = 0;
    rows.forEach(row => total += calcTotalRow(row));
    document.getElementById('preco-total').textContent = formatBRL(total);

    // Exibe/oculta carrinho vazio
    const vazio = document.getElementById('carrinho-vazio');
    const tabela = document.querySelector('.col-12.col-lg-8');
    const lateral = document.querySelector('.col-12.col-lg-4');
    if (rows.length === 0) {
        tabela.style.display = 'none';
        lateral.style.display = 'none';
        vazio.style.display = 'block';
    } else {
        tabela.style.display = '';
        lateral.style.display = '';
        vazio.style.display = 'none';
    }
}

// ── ATUALIZAR TOTAL DA LINHA ─────────────────────────────
function atualizarLinha(row) {
    row.querySelector('.td-total').textContent = formatBRL(calcTotalRow(row));
    atualizarTotal();
}

// ── ADICIONAR AOS REMOVIDOS ──────────────────────────────
function adicionarRemovido(row) {
    const item = {
        id: Date.now(),
        img: row.dataset.img,
        nome: row.dataset.nome,
        precoUnitario: row.dataset.precoUnitario,
        frete: row.dataset.frete
    };
    removidos.unshift(item);
    if (removidos.length > MAX_REMOVIDOS) removidos.pop();
    renderizarRemovidos();
}

function criarLinhaTabela(item) {
    const frete = parseFloat(item.frete);
    const preco = parseFloat(item.precoUnitario);
    const total = preco + frete;

    const tr = document.createElement('tr');
    tr.dataset.precoUnitario = item.precoUnitario;
    tr.dataset.frete = item.frete;
    tr.dataset.img = item.img;
    tr.dataset.nome = item.nome;
    tr.innerHTML = `
        <td>
            <div class="d-flex align-items-center gap-3">
                <img src="${item.img}" alt="Produto" class="produto-img">
                <span class="produto-nome">${item.nome}</span>
            </div>
        </td>
        <td class="text-center td-frete">${formatBRL(frete)}</td>
        <td class="text-center">
            <div class="d-flex flex-column align-items-center gap-1">
                <div class="d-flex align-items-center gap-2">
                    <button class="qty-btn menos">−</button>
                    <span class="qty-num">1</span>
                    <button class="qty-btn mais">+</button>
                </div>
                <button class="btn-remover">
                    <i class="bi bi-trash3"></i> Remover
                </button>
            </div>
        </td>
        <td class="text-center fw-semibold td-total">${formatBRL(total)}</td>
    `;
    return tr;
}

function renderizarRemovidos() {
    const lista = document.getElementById('removidos-lista');
    const bloco = document.getElementById('bloco-removidos');

    if (removidos.length === 0) {
        bloco.style.display = 'none';
        return;
    }

    bloco.style.display = 'block';
    lista.innerHTML = removidos.map(item => `
        <div class="removido-item" data-id="${item.id}">
            <img src="${item.img}" alt="Produto removido" style="border: none;">
            <p>${item.nome}</p>
            <div class="removido-acoes">
                <button class="btn-retomar" data-id="${item.id}">
                    <i class="bi bi-arrow-counterclockwise"></i> Retomar
                </button>
                <button class="btn-excluir-historico" data-id="${item.id}">
                    <i class="bi bi-x-lg"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// ── EVENTOS DA TABELA (delegação) ────────────────────────
document.getElementById('carrinho-tbody').addEventListener('click', function(e) {
    const row = e.target.closest('tr');
    if (!row) return;

    // Botão +
    if (e.target.closest('.mais')) {
        setQty(row, getQty(row) + 1);
        atualizarLinha(row);
    }

    // Botão −
    if (e.target.closest('.menos')) {
        const atual = getQty(row);
        if (atual > 1) {
            setQty(row, atual - 1);
            atualizarLinha(row);
        }
    }

    // Remover
    if (e.target.closest('.btn-remover')) {
        adicionarRemovido(row);
        row.remove();
        atualizarTotal();
    }
});

document.getElementById('removidos-lista').addEventListener('click', function(e) {
    const id = parseInt(e.target.closest('[data-id]')?.dataset.id);
    if (!id) return;

    if (e.target.closest('.btn-retomar')) {
        const idx = removidos.findIndex(i => i.id === id);
        if (idx === -1) return;
        const item = removidos[idx];
        document.getElementById('carrinho-tbody').appendChild(criarLinhaTabela(item));
        removidos.splice(idx, 1);
        renderizarRemovidos();
        atualizarTotal();
    }

    if (e.target.closest('.btn-excluir-historico')) {
        removidos = removidos.filter(i => i.id !== id);
        renderizarRemovidos();
    }
});

document.getElementById('btn-finalizar').addEventListener('click', function() {
    const rows = document.querySelectorAll('#carrinho-tbody tr');
    if (rows.length === 0) return;

    document.getElementById('carrinho-tbody').innerHTML = '';
    atualizarTotal();
});

// ── INICIALIZAR TOTAL ────────────────────────────────────
atualizarTotal();