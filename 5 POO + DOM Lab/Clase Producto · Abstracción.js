class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  // Completa el método renderCard() que devuelve un string con HTML
  renderCard() {
    // Usamos template literals para construir el componente
    return `
      <div class="bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 class="text-xl font-bold">${this.nombre}</h3>
        <p class="text-green-400">$${this.precio}</p>
        <p>Stock: ${this.stock}</p>
        <button class="bg-blue-600 px-3 py-1 rounded mt-2">Comprar</button>
      </div>
    `;
  }
}

// Crear instancia
const producto = new Producto("Teclado Mecánico", 89.99, 15);

// Renderizado (Asegúrate de que el ID coincida con el del contenedor de la plataforma)

const contenedor = document.getElementById("preview-producto");
if (contenedor) {
  contenedor.innerHTML = producto.renderCard();
}