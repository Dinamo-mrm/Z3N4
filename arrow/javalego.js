// A. Seleccionamos las piezas (DOM)
const pantallaSaldo = document.getElementById('saldo-display');
const inputIngreso = document.getElementById('input-ingreso');
const boton = document.getElementById('calcular-btn');

// Variable global para guardar el total
let totalAhorrado = 0;

// B. El Evento (El timbre)
boton.addEventListener('click', function() {
    
    // 1. Traducimos el texto del input a número real
    let montoNuevo = Number(inputIngreso.value);

    // 2. Validamos que el usuario haya escrito un número válido
    if (isNaN(montoNuevo) || montoNuevo <= 0) {
        alert("Por favor, ingresa un número válido mayor a 0.");
        return; // Detenemos la función aquí
    }

    // 3. Hacemos la suma matemática
    totalAhorrado = totalAhorrado + montoNuevo;

    // 4. Actualizamos el DOM (Cambiamos el contenido y el color)
    pantallaSaldo.innerHTML = `$${totalAhorrado}`;
    pantallaSaldo.style.color = 'green';
    
    // Limpiamos el input para el siguiente ingreso
    inputIngreso.value = "";
    console.log("¡Ahorro actualizado con éxito!");
});