// 1. Datos iniciales con propiedad 'stock'
let productos = [
    { nombre: "Auriculares", precio: 59.99, categoria: "Electrónica", emoji: "🎧", stock: 5 },
    { nombre: "Mochila", precio: 34.50, categoria: "Accesorios", emoji: "🎒", stock: 0 },
    { nombre: "Taza Mágica", precio: 12.00, categoria: "Hogar", emoji: "☕", stock: 10 }
];

let carrito = [];

function agregarProducto() {
    const nombre = document.getElementById("inp-nombre").value;
    const precio = Number(document.getElementById("inp-precio").value);
    const categoria = document.getElementById("inp-cat").value;
    const emoji = document.getElementById("inp-emoji").value || "📦";
    const stock = Number(document.getElementById("inp-stock").value) || 0;

    if (!nombre || !precio || !categoria) {
        alert("Completa los campos obligatorios");
        return;
    }

    productos.push({ nombre, precio, categoria, emoji, stock });
    limpiarInputs();
    render();
}

function limpiarInputs() {
    ["inp-nombre", "inp-precio", "inp-cat", "inp-emoji", "inp-stock"].forEach(id => {
        document.getElementById(id).value = "";
    });
}

// Lógica del Carrito
function agregarAlCarrito(index) {
    const prod = productos[index];
    if (prod.stock > 0) {
        carrito.push(prod);
        prod.stock--; // Restamos del inventario
        render();
    } else {
        alert("¡Lo sentimos! Producto agotado.");
    }
}

function render() {
    const catalogo = document.getElementById("catalogo");
    const busqueda = document.getElementById("buscador").value.toLowerCase();
    catalogo.innerHTML = "";

    // Filtrado en tiempo real
    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) || 
        p.categoria.toLowerCase().includes(busqueda)
    );

    productosFiltrados.forEach((p, i) => {
        // Lógica de stock
        const stockStatus = p.stock === 0 
            ? '<span style="color:red; font-weight:bold;">⚠ Sin stock</span>' 
            : `Stock: ${p.stock}`;

        catalogo.innerHTML += `
            <div class="card">
                <div class="emoji">${p.emoji}</div>
                <h3>${p.nombre}</h3>
                <p class="precio">$${p.precio.toFixed(2)}</p>
                <p class="cat">${p.categoria}</p>
                <p class="stock">${stockStatus}</p>
                <button onclick="agregarAlCarrito(${i})" ${p.stock === 0 ? 'disabled' : ''}>🛒 Comprar</button>
                <button class="btn-delete" onclick="eliminarProducto(${i})">🗑 Quitar</button>
            </div>
        `;
    });

    renderCarrito();
    calcularResumen();
}

function renderCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalDiv = document.getElementById("total-carrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        lista.innerHTML += `<p>• ${item.nombre} - $${item.precio.toFixed(2)}</p>`;
        total += item.precio;
    });

    totalDiv.innerHTML = `<strong>Total a pagar: $${total.toFixed(2)}</strong>`;
}

// Mantén tus funciones de resumen y eliminar originales, actualizando render() al final
function eliminarProducto(idx) {
    productos.splice(idx, 1);
    render();
}

function calcularResumen() {
    const total = productos.length;
    let suma = productos.reduce((acc, p) => acc + p.precio, 0);
    const promedio = total > 0 ? (suma / total).toFixed(2) : 0;

    document.getElementById("resumen").innerHTML = `
        <div><strong>${total}</strong> Productos</div>
        <div><strong>$${promedio}</strong> Promedio</div>
        <div><strong>$${suma.toFixed(2)}</strong> Inventario Total</div>
    `;
}

// Ejecución inicial
render();