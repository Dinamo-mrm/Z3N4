class Nota {
    constructor({ id = crypto.randomUUID(), titulo, contenido, categoria, fecha = new Date().toLocaleString() }) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.categoria = categoria;
        this.fecha = fecha;
    }
}

class GestorNotas {
    #notas = []; // Campo privado para proteger el estado

    constructor() {
        this.cargarLocal();
    }

    agregar(data) {
        const nuevaNota = new Nota(data);
        this.#notas = [...this.#notas, nuevaNota];
        this.guardarLocal();
    }

    eliminar(id) {
        this.#notas = this.#notas.filter(n => n.id !== id);
        this.guardarLocal();
    }

    filtrar(texto = '', categoria = '') {
        const q = texto.toLowerCase();
        return this.#notas.filter(n => 
            (!categoria || n.categoria === categoria) &&
            (n.titulo.toLowerCase().includes(q) || n.contenido.toLowerCase().includes(q))
        );
    }

    guardarLocal() {
        localStorage.setItem('notas_db', JSON.stringify(this.#notas));
        render();
    }

    cargarLocal() {
        const data = JSON.parse(localStorage.getItem('notas_db')) || [];
        this.#notas = data.map(n => new Nota(n));
    }

    exportar() {
        return JSON.stringify(this.#notas, null, 2);
    }
}

const gestor = new GestorNotas();

// --- Lógica del DOM ---
const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');

function render() {
    const texto = document.getElementById('searchBar').value;
    const categoria = document.getElementById('filterCategory').value;
    const filtradas = gestor.filtrar(texto, categoria);

    notesGrid.innerHTML = filtradas.map(nota => `
        <article class="note-card">
            <h3>${nota.titulo}</h3>
            <small>${nota.categoria} | ${nota.fecha}</small>
            <p>${nota.contenido}</p>
            <button class="delete-btn" onclick="eliminarNota('${nota.id}')">Eliminar</button>
        </article>
    `).join('');
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    gestor.agregar({
        titulo: document.getElementById('noteTitle').value,
        contenido: document.getElementById('noteContent').value,
        categoria: document.getElementById('noteCategory').value
    });
    noteForm.reset();
});

window.eliminarNota = (id) => gestor.eliminar(id);

// Buscador y filtros inmediatos
document.getElementById('searchBar').addEventListener('input', render);
document.getElementById('filterCategory').addEventListener('change', render);

// Exportación JSON
document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([gestor.exportar()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mis_notas.json';
    a.click();
});

// Toggle de modo oscuro
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

render(); // Carga inicial