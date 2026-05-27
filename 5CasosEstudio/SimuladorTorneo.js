class Equipo {
    constructor(nombre) {
        this.nombre = nombre;
        this.pj = 0; // Partidos Jugados
        this.gf = 0; // Goles a Favor
        this.gc = 0; // Goles en Contra
        this.pts = 0; // Puntos
    }
}

class Partido {
    constructor(local, visitante) {
        this.local = local;
        this.visitante = visitante;
        this.golesLocal = 0;
        this.golesVisitante = 0;
        this.jugado = false;
    }
}

class Torneo {
    constructor() {
        this.equipos = [];
        this.partidos = [];
        this.cargarDesdeStorage();
    }

    agregarEquipo(nombre) {
        const existe = this.equipos.some(e => e.nombre.toLowerCase() === nombre.toLowerCase());
        if (nombre && !existe) {
            this.equipos.push(new Equipo(nombre));
            this.guardarEnStorage();
            return true;
        }
        return false;
    }

    generarFixture() {
        this.partidos = [];
        // Lógica de todos contra todos (Combinatoria i vs j)
        for (let i = 0; i < this.equipos.length; i++) {
            for (let j = i + 1; j < this.equipos.length; j++) {
                this.partidos.push(new Partido(this.equipos[i].nombre, this.equipos[j].nombre));
            }
        }
        this.guardarEnStorage();
    }

    simularPartido() {
        const pendiente = this.partidos.find(p => !p.jugado);
        if (pendiente) {
            pendiente.golesLocal = Math.floor(Math.random() * 5);
            pendiente.golesVisitante = Math.floor(Math.random() * 5);
            pendiente.jugado = true;
            this.actualizarTabla();
            this.guardarEnStorage();
        }
    }

    actualizarTabla() {
        // Reiniciamos estadísticas para recalcular desde cero (evita errores acumulados)
        this.equipos.forEach(e => {
            e.pj = e.gf = e.gc = e.pts = 0;
        });

        this.partidos.filter(p => p.jugado).forEach(p => {
            const el = this.equipos.find(e => e.nombre === p.local);
            const ev = this.equipos.find(e => e.nombre === p.visitante);

            el.pj++; ev.pj++;
            el.gf += p.golesLocal; el.gc += p.golesVisitante;
            ev.gf += p.golesVisitante; ev.gc += p.golesLocal;

            if (p.golesLocal > p.golesVisitante) el.pts += 3;
            else if (p.golesLocal < p.golesVisitante) ev.pts += 3;
            else { el.pts += 1; ev.pts += 1; }
        });
    }

    obtenerPosiciones() {
        // Criterios: Puntos > Diferencia Goles > Goles Favor
        return [...this.equipos].sort((a, b) => 
            b.pts - a.pts || 
            (b.gf - b.gc) - (a.gf - a.gc) || 
            b.gf - a.gf
        );
    }

    guardarEnStorage() {
        localStorage.setItem('torneo_datos', JSON.stringify({
            equipos: this.equipos,
            partidos: this.partidos
        }));
    }

    cargarDesdeStorage() {
        const datos = JSON.parse(localStorage.getItem('torneo_datos'));
        if (datos) {
            this.equipos = datos.equipos;
            this.partidos = datos.partidos;
        }
    }
}

// --- LÓGICA DE INTERFAZ (DOM) ---
const miTorneo = new Torneo();
const ui = {
    input: document.getElementById('teamInput'),
    addBtn: document.getElementById('addTeamBtn'),
    badges: document.getElementById('teamBadgeContainer'),
    startBtn: document.getElementById('startTournamentBtn'),
    simBtn: document.getElementById('simulateBtn'),
    resetBtn: document.getElementById('resetBtn'),
    standings: document.getElementById('standingsBody'),
    fixture: document.getElementById('fixtureContainer')
};

function render() {
    // Dibujar insignias de equipos
    ui.badges.innerHTML = miTorneo.equipos.map(e => 
        `<span class="bg-slate-700 text-xs px-3 py-1 rounded-full border border-slate-500">${e.nombre}</span>`
    ).join('');

    // Dibujar Tabla
    ui.standings.innerHTML = miTorneo.obtenerPosiciones().map((e, i) => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/30 transition">
            <td class="p-4 font-bold text-slate-500">${i + 1}</td>
            <td class="p-4 font-bold">${e.nombre}</td>
            <td class="p-4 text-center">${e.pj}</td>
            <td class="p-4 text-center text-emerald-400">${e.gf}</td>
            <td class="p-4 text-center text-rose-400">${e.gc}</td>
            <td class="p-4 text-center font-black text-white">${e.pts}</td>
        </tr>
    `).join('');

    // Dibujar Fixture
    ui.fixture.innerHTML = miTorneo.partidos.map(p => `
        <div class="glass p-3 rounded-xl border ${p.jugado ? 'border-emerald-900/50' : 'border-slate-700'} flex justify-between items-center">
            <span class="text-sm font-medium w-1/3">${p.local}</span>
            <span class="bg-slate-950 px-3 py-1 rounded font-mono text-emerald-400">
                ${p.jugado ? `${p.golesLocal} - ${p.golesVisitante}` : 'vs'}
            </span>
            <span class="text-sm font-medium w-1/3 text-right">${p.visitante}</span>
        </div>
    `).join('');

    // Control de botones
    ui.simBtn.classList.toggle('hidden', miTorneo.partidos.length === 0 || miTorneo.partidos.every(p => p.jugado));
}

ui.addBtn.onclick = () => {
    if (miTorneo.agregarEquipo(ui.input.value)) {
        ui.input.value = '';
        render();
    }
};

ui.startBtn.onclick = () => {
    if (miTorneo.equipos.length < 2) return alert("Mínimo 2 equipos");
    miTorneo.generarFixture();
    render();
};

ui.simBtn.onclick = () => {
    miTorneo.simularPartido();
    render();
};

ui.resetBtn.onclick = () => {
    localStorage.removeItem('torneo_datos');
    location.reload();
};

// Carga inicial
render();