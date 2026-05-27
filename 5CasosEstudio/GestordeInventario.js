// Configuración global
const UMBRAL_BAJO = 5;

/** * Clase Producto: Representa la entidad individual.
 * Sigue el patrón de recibir un objeto para mayor flexibilidad.
 */
class Producto {
  constructor({ id = crypto.randomUUID(), nombre, categoria, precio, stock }) {
    this.id = id;
    this.nombre = nombre.trim();
    this.categoria = categoria.trim();
    this.precio = Number(precio);
    this.stock = Number(stock);
  }
}

/** * Clase Inventario: Gestiona la colección y persistencia.
 */
class Inventario {
  constructor() {
    // Carga inicial desde localStorage
    const guardados = JSON.parse(localStorage.getItem('inventario_db')) || [];
    this.productos = guardados.map(p => new Producto(p));
  }

  guardar() {
    localStorage.setItem('inventario_db', JSON.stringify(this.productos));
    render(); // Dispara la actualización visual
  }

  agregar(data) {
    this.productos.push(new Producto(data));
    this.guardar();
  }

  eliminar(id) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardar();
  }

  // Actualización inmutable usando Map y Spread
  actualizarStock(id, nuevoStock) {
    this.productos = this.productos.map(p => 
      p.id === id ? new Producto({ ...p, stock: nuevoStock }) : p
    );
    this.guardar();
  }

  obtenerCategorias() {
    return [...new Set(this.productos.map(p => p.categoria))];
  }
}

// --- INSTANCIACIÓN Y CONTROL DEL DOM ---

const miInventario = new Inventario();

const form = document.getElementById('formProducto');
const tabla = document.getElementById('tablaInventario');
const filtro = document.getElementById('filtroCategoria');
const grafico = document.getElementById('graficoBarras');

// Evento de envío de formulario
form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  miInventario.agregar(Object.fromEntries(formData));
  form.reset();
};

// Evento de filtrado
filtro.onchange = () => render();

/** * Función de Renderizado: 
 * Centraliza la actualización de toda la interfaz basándose en el estado actual.
 */
function render() {
  const catSeleccionada = filtro.value;
  const productosFiltrados = catSeleccionada 
    ? miInventario.productos.filter(p => p.categoria === catSeleccionada)
    : miInventario.productos;

  // 1. Renderizar Tabla
  tabla.innerHTML = productosFiltrados.map(p => `
    <tr class="${p.stock <= UMBRAL_BAJO ? 'stock-bajo' : ''} border-b">
      <td class="p-4 font-medium">${p.nombre}</td>
      <td class="p-4 text-gray-500">${p.categoria}</td>
      <td class="p-4">
        <input type="number" value="${p.stock}" 
          onchange="miInventario.actualizarStock('${p.id}', this.value)"
          class="w-16 border rounded px-1">
      </td>
      <td class="p-4">
        <button onclick="miInventario.eliminar('${p.id}')" class="text-red-500 hover:underline">Eliminar</button>
      </td>
    </tr>
  `).join('');

  // 2. Actualizar Selector de Categorías
  const cats = miInventario.obtenerCategorias();
  const categoriaActual = filtro.value;
  filtro.innerHTML = '<option value="">Todas las categorías</option>' + 
    cats.map(c => `<option value="${c}" ${c === categoriaActual ? 'selected' : ''}>${c}</option>`).join('');

  // 3. Renderizar Gráfico Visual
  const maxStock = Math.max(...miInventario.productos.map(p => p.stock), 1);
  grafico.innerHTML = productosFiltrados.map(p => `
    <div class="text-xs">
      <div class="flex justify-between mb-1 text-slate-600">
        <span>${p.nombre}</span>
        <span class="font-bold">${p.stock}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div class="barra-stock ${p.stock <= UMBRAL_BAJO ? 'barra-bajo' : ''}" 
             style="width: ${(p.stock / maxStock) * 100}%"></div>
      </div>
    </div>
  `).join('');

  // 4. Resumen
  document.getElementById('resumen').textContent = `${miInventario.productos.length} Productos registrados`;
}

// Carga inicial al abrir la página
render();