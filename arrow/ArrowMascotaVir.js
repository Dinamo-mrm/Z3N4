class Mascota {
  constructor(nombre, emoji) {
    this.nombre = nombre;
    this.emoji = emoji;
    this.hambre = 50;
    this.energia = 70;
    this.felicidad = 60;
  }

  // ⭐ Reto 1.1 y 1.2 integrados
  alimentar() {
    // Reduce hambre en 30 (mínimo 0), aumenta felicidad +5
    this.hambre = Math.max(0, this.hambre - 30);
    this.felicidad = Math.min(100, this.felicidad + 5);
  }

  jugar() {
    // Limita la interacción: si energía < 15 no puede jugar
    if (this.energia < 15) {
      console.warn(`${this.nombre} está muy cansado para jugar...`);
      return;
    }
    
    // Si energía >= 20, resta 20 de energía, hambre +10, felicidad +15
    this.energia = Math.max(0, this.energia - 20);
    this.hambre = Math.min(100, this.hambre + 10);
    this.felicidad = Math.min(100, this.felicidad + 15);
  }

  // Reto 1.1: Método dormir
  dormir() {
    this.energia = Math.min(100, this.energia + 30);
    this.hambre = Math.min(100, this.hambre + 5);
    console.log(`${this.nombre} ha descansado.`);
  }

  // Reto 1.3 (React Mindset): Componente "Puro"
  // Esta función solo genera el HTML, no toca el DOM directamente
  getHTML() {
    return `
      <div class="card" style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; width: 200px; text-align: center;">
        <div style="font-size: 2rem;">${this.emoji} <strong>${this.nombre}</strong></div>
        <hr>
        <div>🍔 Hambre: ${this.hambre}%</div>
        <div>⚡ Energía: ${this.energia}%</div>
        <div>😊 Felicidad: ${this.felicidad}%</div>
        <br>
        <button id="btnComer">Alimentar</button>
        <button id="btnJugar">Jugar</button>
        <button id="btnDormir">Dormir</button>
      </div>
    `;
  }

  render(container) {
    // Inyectamos el string generado por getHTML
    container.innerHTML = this.getHTML();

    // Asignamos eventos con arrow functions para mantener el contexto de 'this'
    // Sin la arrow function, 'this' dentro de alimentar() sería el botón, no la clase Mascota.
    document.getElementById('btnComer').onclick = () => {
      this.alimentar();
      this.render(container); // Re-renderizamos para actualizar la vista
    };

    document.getElementById('btnJugar').onclick = () => {
      this.jugar();
      this.render(container);
    };

    document.getElementById('btnDormir').onclick = () => {
      this.dormir();
      this.render(container);
    };
  }
}

// Crear instancia y mostrarla
const miMascota = new Mascota("Firulais", "🐕");
const appContainer = document.getElementById('app');

// Inicializamos la app
miMascota.render(appContainer);