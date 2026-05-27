const TASA_IVA = 0.19;
const DESCUENTO = 0.10;

function obtenerPrecioBase() {
  const input = document.getElementById('inp-precio');
  const valor = parseFloat(input.value);

  if (isNaN(valor) || valor <= 0) {
    alert("⚠️ ingrese un VALOR válido SUPERIOR a 0.");
    return null;
  }
  return valor;
}

function mostrarResultados(base, descuentoReal, iva, total, ahorro = 0) {
  const contenedor = document.getElementById('desglose');
  
  contenedor.innerHTML = `
    <div class="linea"><span>Precio Base:</span> <span>$${base.toFixed(2)}</span></div>
    <div class="linea"><span>Descuento:</span> <span>-$${descuentoReal.toFixed(2)}</span></div>
    <div class="linea"><span>IVA (19%):</span> <span>$${iva.toFixed(2)}</span></div>
    <div class="linea total"><span>Total Final:</span> <span>$${total.toFixed(2)}</span></div>
    ${ahorro > 0 ? `<div class="linea ahorro"><span>Has ahorrado:</span> <span>$${ahorro.toFixed(2)}</span></div>` : ''}
  `;
}

function calcularConIVA() {
  const precioBase = obtenerPrecioBase();
  if (precioBase === null) return;

  const valorIVA = precioBase * TASA_IVA;
  const total = precioBase + valorIVA;

  // En este caso el descuento y el ahorro son 0
  mostrarResultados(precioBase, 0, valorIVA, total, 0);
}

function calcularConDescuento() {
  const precioBase = obtenerPrecioBase();
  if (precioBase === null) return;

  // 1. Calcular precio sin descuento para hallar el ahorro después
  const totalSinDescuento = precioBase * (1 + TASA_IVA);

  // 2. Aplicar descuento del 10%
  const montoDescuento = precioBase * DESCUENTO;
  const precioConDescuento = precioBase - montoDescuento;

  // 3. Aplicar IVA sobre el precio ya descontado
  const valorIVA = precioConDescuento * TASA_IVA;
  const totalFinal = precioConDescuento + valorIVA;

  // 4. Calcular ahorro (Diferencia entre lo que pagaría sin descuento vs lo que paga ahora)
  const ahorro = totalSinDescuento - totalFinal;

  mostrarResultados(precioBase, montoDescuento, valorIVA, totalFinal, ahorro);
}