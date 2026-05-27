// ══════════════════════════════════════════════════
// MODELOS (CLASES)
// ══════════════════════════════════════════════════

class CuentaBancaria {
    #saldo = 0;
    #movimientos = [];

    constructor(titular, saldoInicial, tipo) {
        this.titular = titular;
        this.tipo = tipo;
        this.id = Date.now() + Math.random(); 
        if (saldoInicial > 0) {
            this.#saldo = saldoInicial;
            this.registrarMovimiento("apertura", saldoInicial);
        }
    }

    get saldo() { return this.#saldo; }
    
    setSaldo(monto) { this.#saldo = monto; }
    
    setMovimientos(movs) { this.#movimientos = movs; }

    registrarMovimiento(tipo, monto) {
        this.#movimientos.unshift({
            tipo,
            monto,
            fecha: new Date().toLocaleTimeString()
        });
    }

    depositar(monto) {
        if (monto <= 0) throw new Error("Monto inválido");
        this.#saldo += monto;
        this.registrarMovimiento("deposito", monto);
    }

    retirar(monto) {
        if (monto <= 0) throw new Error("Monto inválido");
        if (monto > this.#saldo) throw new Error("Saldo insuficiente");
        this.#saldo -= monto;
        this.registrarMovimiento("retiro", monto);
    }

    getMovimientos() { return [...this.#movimientos].slice(0, 5); }

    toJSON() {
        return {
            titular: this.titular,
            saldo: this.#saldo,
            tipo: this.tipo,
            id: this.id,
            movimientos: this.#movimientos
        };
    }
}

class CuentaAhorro extends CuentaBancaria {
    constructor(titular, saldoInicial) {
        super(titular, saldoInicial, "ahorro");
        this.tasaInteres = 0.02;
    }
    aplicarInteres() {
        const interes = this.saldo * this.tasaInteres;
        if(interes > 0) {
            this.setSaldo(this.saldo + interes);
            this.registrarMovimiento("interes", interes);
        }
    }
}

class CuentaCorriente extends CuentaBancaria {
    constructor(titular, saldoInicial) {
        super(titular, saldoInicial, "corriente");
        this.sobregiro = 200;
    }
    retirar(monto) {
        if (monto <= 0) throw new Error("Monto inválido");
        if (monto > this.saldo + this.sobregiro) throw new Error("Excede límite de sobregiro");
        this.setSaldo(this.saldo - monto);
        this.registrarMovimiento("retiro", monto);
    }
}

class CuentaJoven extends CuentaAhorro {
    constructor(titular, saldoInicial) {
        super(titular, saldoInicial);
        this.tipo = "joven";
        this.tasaInteres = 0.035; 
    }
    depositar(monto) {
        if (monto > 500) throw new Error("Límite de depósito: $500 por operación");
        super.depositar(monto);
    }
}

// ══════════════════════════════════════════════════
// CONTROLADOR DEL BANCO
// ══════════════════════════════════════════════════

class Banco {
    constructor() {
        this.cuentas = [];
        this.seleccionada = 0;
        this.cargarDeLocalStorage();
    }

    crearCuenta() {
        const titularInput = document.getElementById("nw-titular");
        const saldoInput = document.getElementById("nw-saldo");
        const tipo = document.getElementById("nw-tipo").value;

        const titular = titularInput.value.trim();
        const saldo = Number(saldoInput.value);

        if (!titular) return alert("Por favor, ingresa el nombre del titular.");

        let nueva;
        if (tipo === "ahorro") nueva = new CuentaAhorro(titular, saldo);
        else if (tipo === "corriente") nueva = new CuentaCorriente(titular, saldo);
        else nueva = new CuentaJoven(titular, saldo);

        this.cuentas.push(nueva);
        this.seleccionada = this.cuentas.length - 1;
        
        // Limpiar inputs
        titularInput.value = "";
        saldoInput.value = "";
        
        this.guardarEnLocalStorage();
        mostrarTab("cuentas");
        this.renderTodo();
    }

    operar(tipo) {
        const montoInput = document.getElementById("monto-op");
        const monto = Number(montoInput.value);
        const err = document.getElementById("err-op");
        const cuenta = this.cuentas[this.seleccionada];

        try {
            tipo === 'dep' ? cuenta.depositar(monto) : cuenta.retirar(monto);
            err.innerText = "";
            montoInput.value = "";
            this.guardarEnLocalStorage();
            this.renderTodo();
        } catch(e) { 
            err.innerText = "⚠ " + e.message; 
        }
    }

    aplicarIntereses() {
        this.cuentas.forEach(c => {
            if (c instanceof CuentaAhorro) c.aplicarInteres();
        });
        this.guardarEnLocalStorage();
        this.renderTodo();
    }

    guardarEnLocalStorage() {
        localStorage.setItem("banco_data_v2", JSON.stringify(this.cuentas));
    }

    cargarDeLocalStorage() {
        const data = localStorage.getItem("banco_data_v2");
        if (data) {
            const raw = JSON.parse(data);
            this.cuentas = raw.map(c => {
                let inst;
                if (c.tipo === "ahorro") inst = new CuentaAhorro(c.titular, 0);
                else if (c.tipo === "corriente") inst = new CuentaCorriente(c.titular, 0);
                else inst = new CuentaJoven(c.titular, 0);
                
                inst.id = c.id;
                inst.setSaldo(c.saldo);
                inst.setMovimientos(c.movimientos || []);
                return inst;
            });
        }
    }

    seleccionar(i) {
        this.seleccionada = i;
        this.renderTodo();
    }

    renderTodo() {
        const lista = document.getElementById("lista-cuentas");
        lista.innerHTML = this.cuentas.map((c, i) => `
            <div class="chip-cuenta ${i===this.seleccionada?'activo':''}" onclick="banco.seleccionar(${i})">
                ${c.titular}
            </div>
        `).join('');

        const panel = document.getElementById("panel-cuenta");
        if (this.cuentas.length === 0) {
            panel.innerHTML = "<div style='text-align:center; padding:40px; color:#94a3b8;'>No hay cuentas. Crea una nueva en la pestaña '+ Nueva'.</div>";
            return;
        }

        const c = this.cuentas[this.seleccionada];
        panel.innerHTML = `
            <div class="badge">${c.tipo.toUpperCase()}</div>
            <div class="balance">$${c.saldo.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
            <div class="controles">
                <input type="number" id="monto-op" placeholder="Monto $">
                <div style="display:flex; gap:5px">
                    <button class="btn-dep" onclick="banco.operar('dep')">⬆ Dep.</button>
                    <button class="btn-ret" onclick="banco.operar('ret')">⬇ Ret.</button>
                </div>
            </div>
            <div class="error" id="err-op"></div>
            ${c instanceof CuentaCorriente ? `<button class="btn-interes" onclick="banco.aplicarIntereses()">💹 Aplicar Intereses Anuales</button>` : ''}
            ${c instanceof CuentaAhorro ? `<button class="btn-interes" onclick="banco.aplicarIntereses()">💹 Aplicar Intereses Anuales</button>` : ''}
            
            <div class="movimientos">
                <strong>Últimos movimientos:</strong>
                ${c.getMovimientos().map(m => `
                    <div class="mov-item">
                        <span class="${m.tipo==='retiro'?'ret':'dep'}">${m.tipo.toUpperCase()}</span>
                        <span>$${m.monto.toLocaleString()} - <small>${m.fecha}</small></span>
                    </div>
                `).join('')}
            </div>
        `;

        this.renderStats();
    }

    renderStats() {
        const total = this.cuentas.reduce((acc, curr) => acc + curr.saldo, 0);
        const ahorroCount = this.cuentas.filter(c => c instanceof CuentaAhorro).length;
        
        document.getElementById("stat-grid").innerHTML = `
            <div class="stat-card"><div class="stat-val">${this.cuentas.length}</div>Cuentas Totales</div>
            <div class="stat-card"><div class="stat-val">$${total.toLocaleString()}</div>Saldo Global</div>
            <div class="stat-card"><div class="stat-val">${ahorroCount}</div>Cuentas con Interés</div>
        `;
    }
}

// ══════════════════════════════════════════════════
// INICIALIZACIÓN Y NAVEGACIÓN
// ══════════════════════════════════════════════════

const banco = new Banco();
banco.renderTodo();

function mostrarTab(id, event) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content > div').forEach(div => div.classList.add('hidden'));
    // Mostrar la seleccionada
    document.getElementById('tab-' + id).classList.remove('hidden');
    // Actualizar botones de la navegación
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('activa'));
    if (event) event.currentTarget.classList.add('activa');
}