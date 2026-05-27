class MascotaVirtual {
  constructor(nombre, elementoId) {
    this.nombre = nombre;
    this.hambre = 50;
    this.energia = 70;
    this.felicidad = 60;
    this.elemento = document.getElementById(elementoId);
    this.render();
  }

  comer() {
    // Reducimos el hambre (mínimo 0) y mejoramos energía/felicidad (máximo 100)
    this.hambre = Math.max(0, this.hambre - 30);
    this.energia = Math.min(100, this.energia + 10);
    this.felicidad = Math.min(100, this.felicidad + 5);
    this.render();
  }

  jugar() {
    // Verificamos si tiene suficiente energía para jugar
    if (this.energia < 20) {
        alert(`${this.nombre} está muy cansado para jugar...`);
        return;
    }
    this.energia = Math.max(0, this.energia - 20);
    this.hambre = Math.min(100, this.hambre + 15);
    this.felicidad = Math.min(100, this.felicidad + 25);
    this.render();
  }

  render() {
    if (!this.elemento) return;

    this.elemento.innerHTML = `
      <div class="bg-gray-800 p-4 rounded-xl text-white">
        <h3 class="text-xl font-bold mb-2">🐕 ${this.nombre}</h3>
        
        <div class="mb-2">
            🍔 Hambre: ${this.hambre}% 
            <div class="bg-gray-700 h-2 rounded-full mt-1">
                <div class="bg-red-500 h-2 rounded-full transition-all" style="width: ${this.hambre}%"></div>
            </div>
        </div>

        <div class="mb-2">
            ⚡ Energía: ${this.energia}% 
            <div class="bg-gray-700 h-2 rounded-full mt-1">
                <div class="bg-yellow-500 h-2 rounded-full transition-all" style="width: ${this.energia}%"></div>
            </div>
        </div>

        <div class="mb-4">
            😊 Felicidad: ${this.felicidad}% 
            <div class="bg-gray-700 h-2 rounded-full mt-1">
                <div class="bg-green-500 h-2 rounded-full transition-all" style="width: ${this.felicidad}%"></div>
            </div>
        </div>

        <div class="flex gap-2">
          <button id="btnComer" class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors">🍎 Comer</button>
          <button id="btnJugar" class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition-colors">🎾 Jugar</button>
        </div>
      </div>
    `;

    // Asignación de eventos después de renderizar el HTML
    const comerBtn = this.elemento.querySelector('#btnComer');
    const jugarBtn = this.elemento.querySelector('#btnJugar');

    comerBtn.onclick = () => this.comer();
    jugarBtn.onclick = () => this.jugar();
  }
}

// Ejemplo de inicialización:
// const miMascota = new MascotaVirtual("Firulais", "contenedor-mascota");