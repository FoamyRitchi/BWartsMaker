// ── ESTADO GLOBAL ────────────────────────────────────────
const canvas = document.getElementById('canvas-principal');
const ctx    = canvas.getContext('2d');

let ferramenta   = 'selecionar';
let desenhando   = false;
let startX, startY;
let caminhoAtual = [];
let objetos      = [];
let historico    = [];
let refeitos     = [];
let selecionado  = null;
let arrastando   = false;
let offsetArr    = { x: 0, y: 0 };
let snapshotTemp = null;

// ── HELPERS DE PROPRIEDADES ──────────────────────────────
function getProps() {
    return {
        preenchimento: document.getElementById('cor-preenchimento').value,
        contorno:      document.getElementById('cor-contorno').value,
        espessura:     parseInt(document.getElementById('espessura').value) || 2,
        opacidade:     parseInt(document.getElementById('opacidade').value) / 100,
        fonte:         parseInt(document.getElementById('tamanho-fonte').value) || 20,
    };
}

// ── FERRAMENTAS ──────────────────────────────────────────
function setFerramenta(f) {
    ferramenta = f;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('ativo'));
    const btn = document.getElementById('tool-' + f);
    if (btn) btn.classList.add('ativo');

    const nomes = {
        selecionar: 'Selecionar', lapis: 'Lápis livre', linha: 'Linha',
        retangulo: 'Retângulo', circulo: 'Círculo', triangulo: 'Triângulo',
        texto: 'Texto', borracha: 'Borracha'
    };
    document.getElementById('status-ferramenta').textContent = nomes[f] || f;

    const cursores = {
        selecionar: 'default', lapis: 'crosshair', linha: 'crosshair',
        retangulo: 'crosshair', circulo: 'crosshair', triangulo: 'crosshair',
        texto: 'text', borracha: 'cell'
    };
    canvas.style.cursor = cursores[f] || 'crosshair';
}

// ── COORDENADAS ──────────────────────────────────────────
function getXY(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return {
        x: (src.clientX - rect.left) * scaleX,
        y: (src.clientY - rect.top)  * scaleY
    };
}

// ── RENDERIZAÇÃO ─────────────────────────────────────────
function renderizar() {
    // Fundo
    ctx.fillStyle = document.getElementById('cor-fundo').value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objetos.forEach((obj, i) => {
        ctx.save();
        ctx.globalAlpha = obj.opacidade ?? 1;

        if (i === selecionado) {
            ctx.shadowColor = '#FF8E1C';
            ctx.shadowBlur  = 10;
        }

        desenharObjeto(obj);
        ctx.restore();

        if (i === selecionado) desenharAlcas(obj);
    });

    document.getElementById('status-objetos').textContent = objetos.length + ' objeto' + (objetos.length !== 1 ? 's' : '');
}

function desenharObjeto(obj) {
    ctx.strokeStyle = obj.contorno;
    ctx.lineWidth   = obj.espessura;
    ctx.fillStyle   = obj.preenchimento;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    switch(obj.tipo) {
        case 'retangulo':
            if (obj.preenchimento !== 'transparent') ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
            ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
            break;

        case 'circulo': {
            const cx = obj.x + obj.w / 2;
            const cy = obj.y + obj.h / 2;
            const rx = Math.abs(obj.w / 2);
            const ry = Math.abs(obj.h / 2);
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            if (obj.preenchimento !== 'transparent') ctx.fill();
            ctx.stroke();
            break;
        }

        case 'triangulo': {
            const x1 = obj.x + obj.w / 2, y1 = obj.y;
            const x2 = obj.x,              y2 = obj.y + obj.h;
            const x3 = obj.x + obj.w,      y3 = obj.y + obj.h;
            ctx.beginPath();
            ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3);
            ctx.closePath();
            if (obj.preenchimento !== 'transparent') ctx.fill();
            ctx.stroke();
            break;
        }

        case 'linha':
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(obj.x + obj.w, obj.y + obj.h);
            ctx.stroke();
            break;

        case 'lapis':
        case 'borracha':
            if (!obj.pontos || obj.pontos.length < 2) break;
            ctx.strokeStyle = obj.tipo === 'borracha'
                ? document.getElementById('cor-fundo').value
                : obj.contorno;
            ctx.lineWidth = obj.tipo === 'borracha' ? obj.espessura * 4 : obj.espessura;
            ctx.beginPath();
            ctx.moveTo(obj.pontos[0].x, obj.pontos[0].y);
            obj.pontos.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.stroke();
            break;

        case 'texto':
            ctx.font      = `${obj.tamanho}px Syne, sans-serif`;
            ctx.fillStyle = obj.preenchimento;
            ctx.fillText(obj.texto, obj.x, obj.y);
            break;
    }
}

function desenharAlcas(obj) {
    if (!obj || obj.tipo === 'lapis' || obj.tipo === 'borracha') return;
    const b = getBounds(obj);
    if (!b) return;
    const pontos = [
        [b.x, b.y], [b.x + b.w/2, b.y], [b.x + b.w, b.y],
        [b.x, b.y + b.h/2],              [b.x + b.w, b.y + b.h/2],
        [b.x, b.y + b.h], [b.x + b.w/2, b.y + b.h], [b.x + b.w, b.y + b.h]
    ];
    ctx.save();
    ctx.strokeStyle = '#FF8E1C';
    ctx.lineWidth   = 1.5;
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(b.x, b.y, b.w, b.h);
    ctx.setLineDash([]);
    pontos.forEach(([px, py]) => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(px - 4, py - 4, 8, 8);
        ctx.strokeStyle = '#FF8E1C';
        ctx.strokeRect(px - 4, py - 4, 8, 8);
    });
    ctx.restore();
}

function getBounds(obj) {
    if (!obj) return null;
    if (obj.tipo === 'texto') {
        ctx.font = `${obj.tamanho}px Syne, sans-serif`;
        const w = ctx.measureText(obj.texto).width;
        return { x: obj.x, y: obj.y - obj.tamanho, w, h: obj.tamanho };
    }
    const x = Math.min(obj.x, obj.x + (obj.w || 0));
    const y = Math.min(obj.y, obj.y + (obj.h || 0));
    return { x, y, w: Math.abs(obj.w || 0), h: Math.abs(obj.h || 0) };
}

// ── HIT TEST ─────────────────────────────────────────────
function hitTest(obj, x, y) {
    if (obj.tipo === 'lapis' || obj.tipo === 'borracha') {
        return obj.pontos?.some(p => Math.hypot(p.x - x, p.y - y) < 8);
    }
    const b = getBounds(obj);
    if (!b) return false;
    return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
}

// ── EVENTOS DO CANVAS ────────────────────────────────────
canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mousemove', continuarDesenho);
canvas.addEventListener('mouseup',   finalizarDesenho);
canvas.addEventListener('mouseleave', finalizarDesenho);
canvas.addEventListener('mousemove', e => {
    const {x, y} = getXY(e);
    document.getElementById('status-pos').textContent = `${Math.round(x)}, ${Math.round(y)}`;
});

function iniciarDesenho(e) {
    const {x, y} = getXY(e);
    const props  = getProps();
    desenhando   = true;
    startX = x; startY = y;

    if (ferramenta === 'selecionar') {
        // Verificar clique em objeto (de cima pra baixo)
        let achado = -1;
        for (let i = objetos.length - 1; i >= 0; i--) {
            if (hitTest(objetos[i], x, y)) { achado = i; break; }
        }
        selecionado = achado;

        if (selecionado !== -1) {
            arrastando = true;
            offsetArr.x = x - objetos[selecionado].x;
            offsetArr.y = y - objetos[selecionado].y;
        }

        renderizar();
        return;
    }

    if (ferramenta === 'texto') {
        const texto = prompt('Digite o texto:');
        if (texto) {
            salvarHistorico();
            objetos.push({
                tipo: 'texto', x, y, texto,
                preenchimento: props.preenchimento,
                contorno: props.contorno,
                espessura: props.espessura,
                opacidade: props.opacidade,
                tamanho: props.fonte
            });
            renderizar();
        }
        desenhando = false;
        return;
    }

    if (ferramenta === 'lapis' || ferramenta === 'borracha') {
        caminhoAtual = [{x, y}];
        return;
    }

    // Formas: captura snapshot do canvas para preview
    snapshotTemp = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function continuarDesenho(e) {
    if (!desenhando) return;
    const {x, y} = getXY(e);

    if (ferramenta === 'selecionar' && arrastando && selecionado !== -1) {
        const obj = objetos[selecionado];
        if (obj.tipo === 'lapis' || obj.tipo === 'borracha') {
            const dx = x - offsetArr.x - obj.x;
            const dy = y - offsetArr.y - obj.y;
            obj.pontos = obj.pontos.map(p => ({x: p.x + dx, y: p.y + dy}));
            obj.x = x - offsetArr.x;
            obj.y = y - offsetArr.y;
        } else {
            obj.x = x - offsetArr.x;
            obj.y = y - offsetArr.y;
        }
        renderizar();
        return;
    }

    const props = getProps();

    if (ferramenta === 'lapis' || ferramenta === 'borracha') {
        caminhoAtual.push({x, y});
        // Preview em tempo real
        renderizar();
        ctx.save();
        ctx.globalAlpha = props.opacidade;
        ctx.strokeStyle = ferramenta === 'borracha'
            ? document.getElementById('cor-fundo').value
            : props.contorno;
        ctx.lineWidth = ferramenta === 'borracha' ? props.espessura * 4 : props.espessura;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(caminhoAtual[0].x, caminhoAtual[0].y);
        caminhoAtual.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.restore();
        return;
    }

    if (!snapshotTemp) return;

    // Preview das formas
    ctx.putImageData(snapshotTemp, 0, 0);
    ctx.save();
    ctx.globalAlpha = props.opacidade;
    ctx.strokeStyle = props.contorno;
    ctx.fillStyle   = props.preenchimento;
    ctx.lineWidth   = props.espessura;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    const w = x - startX, h = y - startY;

    switch(ferramenta) {
        case 'retangulo':
            ctx.fillRect(startX, startY, w, h);
            ctx.strokeRect(startX, startY, w, h);
            break;
        case 'circulo': {
            const cx = startX + w/2, cy = startY + h/2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, Math.abs(w/2), Math.abs(h/2), 0, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            break;
        }
        case 'triangulo': {
            ctx.beginPath();
            ctx.moveTo(startX + w/2, startY);
            ctx.lineTo(startX, startY + h);
            ctx.lineTo(startX + w, startY + h);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            break;
        }
        case 'linha':
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.stroke();
            break;
    }
    ctx.restore();
}

function finalizarDesenho(e) {
    if (!desenhando) return;
    desenhando = false;

    if (ferramenta === 'selecionar') {
        if (arrastando) salvarHistorico();
        arrastando = false;
        return;
    }

    const props = getProps();

    if (ferramenta === 'lapis' || ferramenta === 'borracha') {
        if (caminhoAtual.length > 1) {
            salvarHistorico();
            objetos.push({
                tipo: ferramenta,
                x: caminhoAtual[0].x, y: caminhoAtual[0].y,
                pontos: [...caminhoAtual],
                contorno: props.contorno,
                preenchimento: props.contorno,
                espessura: props.espessura,
                opacidade: props.opacidade
            });
        }
        caminhoAtual = [];
        renderizar();
        return;
    }

    const {x, y} = e.type === 'mouseleave' ? {x: startX, y: startY} : getXY(e);
    const w = x - startX, h = y - startY;

    if (Math.abs(w) < 3 && Math.abs(h) < 3 && ferramenta !== 'texto') {
        snapshotTemp = null;
        renderizar();
        return;
    }

    salvarHistorico();
    objetos.push({
        tipo: ferramenta,
        x: startX, y: startY, w, h,
        preenchimento: props.preenchimento,
        contorno: props.contorno,
        espessura: props.espessura,
        opacidade: props.opacidade
    });

    snapshotTemp = null;
    renderizar();
}

// ── HISTÓRICO ────────────────────────────────────────────
function salvarHistorico() {
    historico.push(JSON.stringify(objetos));
    if (historico.length > 50) historico.shift();
    refeitos = [];
}

function desfazer() {
    if (!historico.length) return;
    refeitos.push(JSON.stringify(objetos));
    objetos = JSON.parse(historico.pop());
    selecionado = null;
    renderizar();
}

function refazer() {
    if (!refeitos.length) return;
    historico.push(JSON.stringify(objetos));
    objetos = JSON.parse(refeitos.pop());
    selecionado = null;
    renderizar();
}

function limparTudo() {
    if (!objetos.length) return;
    if (!confirm('Limpar tudo? Esta ação pode ser desfeita.')) return;
    salvarHistorico();
    objetos = [];
    selecionado = null;
    renderizar();
}

// ── OPERAÇÕES DE OBJETO ──────────────────────────────────
function deletarSelecionado() {
    if (selecionado === null || selecionado === -1) return;
    salvarHistorico();
    objetos.splice(selecionado, 1);
    selecionado = null;
    renderizar();
}

function moverFrente() {
    if (selecionado === null || selecionado === -1 || selecionado >= objetos.length - 1) return;
    salvarHistorico();
    const obj = objetos.splice(selecionado, 1)[0];
    objetos.push(obj);
    selecionado = objetos.length - 1;
    renderizar();
}

function moverAtras() {
    if (selecionado === null || selecionado <= 0) return;
    salvarHistorico();
    const obj = objetos.splice(selecionado, 1)[0];
    objetos.unshift(obj);
    selecionado = 0;
    renderizar();
}

// ── TECLAS DE ATALHO ─────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); desfazer(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); refazer(); }
    if (e.key === 'Delete' || e.key === 'Backspace') deletarSelecionado();
    if (e.key === 'v') setFerramenta('selecionar');
    if (e.key === 'p') setFerramenta('lapis');
    if (e.key === 'r') setFerramenta('retangulo');
    if (e.key === 'c') setFerramenta('circulo');
    if (e.key === 't') setFerramenta('texto');
    if (e.key === 'e') setFerramenta('borracha');
});

// ── COR DE FUNDO ─────────────────────────────────────────
document.getElementById('cor-fundo').addEventListener('input', renderizar);

// ── OPACIDADE ────────────────────────────────────────────
document.getElementById('opacidade').addEventListener('input', function() {
    document.getElementById('opacidade-label').textContent = this.value + '%';
});

// ── SWATCHES DE COR ──────────────────────────────────────
document.getElementById('swatches-preenchimento').addEventListener('click', e => {
    const sw = e.target.closest('.swatch');
    if (!sw) return;
    document.getElementById('cor-preenchimento').value = sw.dataset.cor;
    document.querySelectorAll('#swatches-preenchimento .swatch').forEach(s => s.classList.remove('ativo'));
    sw.classList.add('ativo');
});

// ── EXPORTAR PNG ─────────────────────────────────────────
function exportarPNG() {
    const selAnterior = selecionado;
    selecionado = null;

    // Renderiza sem alças de seleção
    ctx.fillStyle = document.getElementById('cor-fundo').value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    objetos.forEach(obj => {
        ctx.save();
        ctx.globalAlpha = obj.opacidade ?? 1;
        desenharObjeto(obj);
        ctx.restore();
    });

    // Captura o blob com o canvas já pintado
    canvas.toBlob(blob => {
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'bwarts-personalizacao.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);

        // Restaura a seleção e redesenha com alças
        selecionado = selAnterior;
        renderizar();
    }, 'image/png');
}


// ── INICIALIZAR ──────────────────────────────────────────
renderizar();