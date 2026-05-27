class Producto {
    constructor(nombre, precio, emoji) {
        this.nombre = nombre;
        this.precio = precio;
        this.emoji = emoji;
    }
}

class Carrito {
    constructor() {
        this.items = []; // Estructura: { producto, cantidad }
    }

    agregar(producto) {
        const existe = this.items.find(item => item.producto.nombre === producto.nombre);
        
        if (existe) {
            // Inmutabilidad: map crea un nuevo array, spread crea un nuevo objeto
            this.items = this.items.map(item =>
                item.producto.nombre === producto.nombre
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
        } else {
            // Spread operator para agregar sin mutar el array original
            this.items = [...this.items, { producto, cantidad: 1 }];
        }
    }

    // Reto 2.1: Eliminar o reducir cantidad usando filter y spread
    eliminar(nombreProducto) {
        const existe = this.items.find(item => item.producto.nombre === nombreProducto);
        
        if (existe && existe.cantidad > 1) {
            this.items = this.items.map(item =>
                item.producto.nombre === nombreProducto
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            );
        } else {
            // Si es 1, lo removemos completamente del array
            this.items = this.items.filter(item => item.producto.nombre !== nombreProducto);
        }
    }

    total() {
        // Destructuring en los parámetros del reduce ({ producto, cantidad })
        return this.items.reduce((acum, { producto, cantidad }) => acum + (producto.precio * cantidad), 0);
    }

    // Reto 2.2: Aplicar descuento inmutable
    aplicarDescuento(porcentaje) {
        const totalActual = this.total();
        const descuento = (totalActual * porcentaje) / 100;
        return totalActual - descuento;
    }

    // Reto 2.3 (React Concept): Recibe un callback para renderizar cada item
    render(container, itemComponent) {
        if (this.items.length === 0) {
            container.innerHTML = "<p>El carrito está vacío 🛒</p>";
            document.getElementById('total-area').innerHTML = "";
            return;
        }

        container.innerHTML = "";
        const ul = document.createElement('ul');
        ul.style.padding = "0";

        this.items.forEach(item => {
            // Invocamos el "componente hijo" (callback)
            ul.innerHTML += itemComponent(item);
        });

        container.appendChild(ul);
        
        // Mostrar totales
        const total = this.total().toFixed(2);
        const conDescuento = this.aplicarDescuento(10).toFixed(2); // Ejemplo 10% dto

        document.getElementById('total-area').innerHTML = `
            <div>Subtotal: $${total}</div>
            <div style="color: green; font-size: 0.9rem;">Total con 10% Dto: $${conDescuento}</div>
        `;
    }
}

// --- LÓGICA DE LA APLICACIÓN ---

const miCarrito = new Carrito();
const catalogo = [
    new Producto("Café", 4.50, "☕"),
    new Producto("Pizza", 12.00, "🍕"),
    new Producto("Agua", 1.20, "💧")
];

// Función que actúa como "Componente Hijo" (Reto 2.3)
const ItemComponent = ({ producto, cantidad }) => `
    <li class="cart-item">
        <span>${producto.emoji} ${producto.nombre} (x${cantidad})</span>
        <span>$${(producto.precio * cantidad).toFixed(2)}</span>
        <button onclick="controladorEliminar('${producto.nombre}')" class="btn-del">x</button>
    </li>
`;

const renderApp = () => {
    miCarrito.render(document.getElementById('cart'), ItemComponent);
};

// Controladores globales para los botones
window.controladorAgregar = (idx) => {
    miCarrito.agregar(catalogo[idx]);
    renderApp();
};

window.controladorEliminar = (nombre) => {
    miCarrito.eliminar(nombre);
    renderApp();
};

// Renderizar catálogo inicial
const listaProd = document.getElementById('productos');
catalogo.forEach((p, index) => {
    listaProd.innerHTML += `
        <div class="producto-item">
            <span>${p.emoji} ${p.nombre} - $${p.precio}</span>
            <button class="btn-add" onclick="controladorAgregar(${index})">Agregar</button>
        </div>
    `;
});

renderApp();