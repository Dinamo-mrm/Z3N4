class Transaccion {
    constructor({ id = crypto.randomUUID(), concepto, monto, tipo, categoria, fecha }) {
        this.id = id;
        this.concepto = concepto;
        this.monto = parseFloat(monto);
        this.tipo = tipo;
        this.categoria = categoria;
        this.fecha = fecha;
    }
}

class Presupuesto {
    constructor() {
        // Carga y limpia datos corruptos (NaN o undefined) de sesiones previas[cite: 1]
        const raw = JSON.parse(localStorage.getItem('finanzas')) || [];
        this.transacciones = raw
            .filter(t => t.concepto && !isNaN(t.monto) && t.fecha)
            .map(t => new Transaccion(t));
    }

    agregar(datos) {
        const nueva = new Transaccion(datos);
        this.transacciones.push(nueva);
        this.guardar();
    }

    guardar() {
        localStorage.setItem('finanzas', JSON.stringify(this.transacciones));
    }

    obtenerBalance(datos = this.transacciones) {
        return datos.reduce((total, t) => 
            t.tipo === 'ingreso' ? total + t.monto : total - t.monto, 0);
    }

    filtrarPorMes(mes) {
        return mes ? this.transacciones.filter(t => t.fecha.startsWith(mes)) : this.transacciones;
    }

    gastosPorCategoria(datos) {
        return datos.filter(t => t.tipo === 'gasto')
            .reduce((acc, t) => {
                acc[t.categoria] = (acc[t.categoria] || 0) + t.monto;
                return acc;
            }, {});
    }
}

// Inicialización de la UI
const app = new Presupuesto();
const form = document.getElementById('financeForm');
const tabla = document.getElementById('tablaCuerpo');
const balanceText = document.getElementById('totalBalance');
const filtroMes = document.getElementById('filtroMes');
const svg = document.getElementById('pieChart');
const leyenda = document.getElementById('leyenda');

function render() {
    const mesActual = filtroMes.value;
    const datosFiltrados = app.filtrarPorMes(mesActual);
    
    // 1. Tabla de Historial[cite: 1]
    tabla.innerHTML = datosFiltrados.sort((a,b) => new Date(b.fecha) - new Date(a.fecha))
        .map(t => `
        <tr>
            <td>${t.fecha}</td>
            <td>${t.concepto}</td>
            <td>${t.categoria}</td>
            <td class="${t.tipo}">${t.tipo === 'ingreso' ? '+' : '-'}$${t.monto.toLocaleString()}</td>
        </tr>
    `).join('');

    // 2. Balance Total[cite: 1]
    const balance = app.obtenerBalance(datosFiltrados);
    balanceText.textContent = `$${balance.toLocaleString()}`;
    balanceText.className = balance >= 0 ? 'ingreso' : 'gasto';

    // 3. Gráfico de Gastos[cite: 1]
    renderPieChart(app.gastosPorCategoria(datosFiltrados));
}

function renderPieChart(categorias) {
    const entradas = Object.entries(categorias);
    const total = entradas.reduce((a, [_, b]) => a + b, 0);
    const colores = ['#38bdf8', '#fbbf24', '#f87171', '#818cf8', '#34d399', '#a78bfa'];
    
    svg.innerHTML = '';
    leyenda.innerHTML = '';

    if (total === 0) {
        svg.innerHTML = '<circle cx="0" cy="0" r="1" fill="#e2e8f0" />';
        return;
    }

    let anguloAcumulado = 0;

    entradas.forEach(([cat, monto], i) => {
        const porcentaje = monto / total;
        const color = colores[i % colores.length];
        
        // Coordenadas para el arco SVG[cite: 1]
        const [startX, startY] = [Math.cos(2 * Math.PI * anguloAcumulado), Math.sin(2 * Math.PI * anguloAcumulado)];
        anguloAcumulado += porcentaje;
        const [endX, endY] = [Math.cos(2 * Math.PI * anguloAcumulado), Math.sin(2 * Math.PI * anguloAcumulado)];
        
        const largeArcFlag = porcentaje > 0.5 ? 1 : 0;
        const d = porcentaje === 1 
            ? `M 1 0 A 1 1 0 1 1 0.99 -0.01 L 0 0` 
            : `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', color);
        svg.appendChild(path);

        // Añadir a la leyenda[cite: 1]
        leyenda.innerHTML += `
            <div class="legend-item">
                <span class="dot" style="background:${color}"></span>
                <span>${cat}: $${monto.toLocaleString()} (${(porcentaje*100).toFixed(1)}%)</span>
            </div>`;
    });
}

// Eventos
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    app.agregar(Object.fromEntries(formData));
    form.reset();
    render();
};

filtroMes.onchange = render;

// Establecer fecha de hoy por defecto[cite: 1]
document.getElementById('inputFecha').valueAsDate = new Date();
render();