const TASA_DESCUENTO = 0.10; // 10%

function calcularConDescuento() {
    const precioBase = Number(document.getElementById("inp-precio").value);

    if (precioBase <= 0) {
        alert("Ingresa un precio válido");
        return;
    }

    // A. Cálculo con Descuento
    const montoDescuento = precioBase * TASA_DESCUENTO;
    const nuevoSubtotal = precioBase - montoDescuento;

    // B. Cálculo del IVA sobre el precio ya descontado
    const valorIVA = nuevoSubtotal * TASA_IVA;
    const precioTotalConDescuento = nuevoSubtotal + valorIVA;

    // C. ¿Cuánto se ahorra? 
    // Comparamos (Precio Original + IVA) vs (Precio con Descuento + IVA)
    const precioOriginalConIVA = precioBase + (precioBase * TASA_IVA);
    const ahorroTotal = precioOriginalConIVA - precioTotalConDescuento;

    // D. Mostrar resultados
    document.getElementById("desglose").innerHTML = `
        <p>Precio Original: $${precioBase.toFixed(2)}</p>
        <p>Descuento (10%): -$${montoDescuento.toFixed(2)}</p>
        <p>Nuevo Subtotal: $${nuevoSubtotal.toFixed(2)}</p>
        <p>IVA (19%): $${valorIVA.toFixed(2)}</p>
        <hr>
        <p><strong>TOTAL A PAGAR: $${precioTotalConDescuento.toFixed(2)}</strong></p>
        <p style="color: green;"><strong>¡Te ahorraste: $${ahorroTotal.toFixed(2)}!</strong></p>
    `;
}