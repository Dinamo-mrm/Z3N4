class Usuario {
  #nombre;
  #fotoUrl;

  constructor(nombre, fotoUrl) {
    this.#nombre = nombre;
    this.#fotoUrl = fotoUrl;
    // Llamamos al método interno para que se renderice al crear el objeto
    this.#actualizarDOM(); 
  }

  cambiarNombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
    this.#actualizarDOM();
  }

  cambiarFoto(nuevaFoto) {
    this.#fotoUrl = nuevaFoto;
    this.#actualizarDOM();
  }

  // Este método es privado, nadie fuera de la clase puede usarlo
  #actualizarDOM() {
    const headerDiv = document.getElementById("usuario-header");
    if (headerDiv) {
      headerDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${this.#fotoUrl}" class="w-12 h-12 rounded-full object-cover" />
          <span class="font-bold text-lg">${this.#nombre}</span>
        </div>
      `;
    }
  }
}

// Instanciar
const usuario = new Usuario("Ana García", "https://randomuser.me/api/portraits/women/68.jpg");

// ✅ CORRECTO: Usamos los métodos públicos
usuario.cambiarNombre("Ana G."); 

// ❌ ERROR: Esto causará error porque el método es privado (#)
// usuario.#actualizarDOM();