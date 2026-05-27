class Multimedia {
  constructor(titulo, anio) {
    this.titulo = titulo;
    this.anio = anio;
  }

  render() {
    return `<div class="bg-gray-800 p-3 rounded-lg mb-2">🎬 ${this.titulo} (${this.anio})</div>`;
  }
}

class Pelicula extends Multimedia {
  constructor(titulo, anio, director) {
    super(titulo, anio); // Llamada al constructor de la clase padre
    this.director = director;
  }

  render() {
    // Sobrescritura: Polimorfismo en acción
    return `
      <div class="bg-purple-900/40 p-3 rounded-lg border border-purple-500 mb-2">
        🎥 ${this.titulo} (${this.anio}) <br>
        <span class="text-sm text-purple-300 italic">Dirigida por: ${this.director}</span>
      </div>
    `;
  }
}

// Lógica de Renderizado
const lista = [
  new Multimedia("The Last of Us", 2023), 
  new Pelicula("Interstellar", 2014, "Christopher Nolan"),
  new Pelicula("El Padrino", 1972, "Francis Ford Coppola")
];

const contenedor = document.getElementById("catalogo-preview");

if (contenedor) {
  contenedor.innerHTML = lista.map(item => item.render()).join('');
} else {
  console.error("No se encontró el contenedor 'catalogo-preview'");
}