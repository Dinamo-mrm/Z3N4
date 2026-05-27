class Cliente {
    constructor(nombre, tipo = 'normal') {
        this.id = crypto.randomUUID();
        this.nombre = nombre;
        this.tipo = tipo;
        this.llegada = Date.now(); //
    }
}

class ColaAtencion {
    constructor() {
        this.cola = [];
        this.historialAtendidos = [];
    }

    encolar(cliente) {
        if (cliente.tipo === 'prioritario') {
            // Se inserta antes del primer cliente normal
            const index = this.cola.findIndex(c => c.tipo === 'normal');
            if (index === -1) this.cola.push(cliente);
            else this.cola.splice(index, 0, cliente);
        } else {
            this.cola.push(cliente);
        }
    }

    desencolar() {
        const [primero, ...resto] = this.cola; // Uso de rest
        this.cola = resto;
        return primero;
    }

    atenderCliente() {
        return new Promise((resolve, reject) => {
            if (this.cola.length === 0) return reject("No hay clientes");
            
            const cliente = this.desencolar();
            // Simulación asíncrona con setTimeout[cite: 1]
            setTimeout(() => {
                const tiempoEspera = (Date.now() - cliente.llegada) / 1000;
                this.historialAtendidos.push(tiempoEspera);
                resolve(cliente);
            }, 2000); 
        });
    }

    get promedioEspera() {
        if (this.historialAtendidos.length === 0) return 0;
        const total = this.historialAtendidos.reduce((acc, tiempo) => acc + tiempo, 0);
        return (total / this.historialAtendidos.length).toFixed(2);
    }
}

// --- Lógica de Interfaz ---
const miCola = new ColaAtencion();
const btnEncolar = document.getElementById('btnEncolar');
const btnAtender = document.getElementById('btnAtender');

btnEncolar.onclick = () => {
    const nombre = document.getElementById('nombreCliente').value;
    const tipo = document.getElementById('tipoCliente').value;
    
    if (nombre.trim()) {
        miCola.encolar(new Cliente(nombre, tipo));
        document.getElementById('nombreCliente').value = '';
        render();
    }
};

async function atender() {
    if (miCola.cola.length === 0) return;

    btnAtender.disabled = true; // Evitar dobles clics[cite: 1]
    const proximo = miCola.cola[0].nombre;
    document.getElementById('clienteActual').textContent = `Atendiendo a: ${proximo}...`;

    try {
        await miCola.atenderCliente(); //[cite: 1]
        document.getElementById('clienteActual').textContent = "¡Atendido!";
    } catch (error) {
        console.error(error);
    } finally {
        btnAtender.disabled = false;
        render();
    }
}

btnAtender.onclick = atender;

function render() {
    const colaVisual = document.getElementById('colaVisual');
    const proxNombre = document.getElementById('nombreSiguiente');
    
    colaVisual.innerHTML = '';
    miCola.cola.forEach(c => {
        const div = document.createElement('div');
        div.className = `cliente-tag ${c.tipo === 'prioritario' ? 'prioritario' : ''}`;
        div.textContent = c.nombre;
        colaVisual.appendChild(div);
    });

    proxNombre.textContent = miCola.cola[0]?.nombre || '--';
    document.getElementById('totalAtendidos').textContent = miCola.historialAtendidos.length;
    document.getElementById('promedioEspera').textContent = miCola.promedioEspera;
}