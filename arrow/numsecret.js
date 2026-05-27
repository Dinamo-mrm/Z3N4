// El número secreto guardado en una constante
const NUMERO_SECRETO = 7;

// VARIABLE GLOBAL: Se declara afuera para que no se borre al hacer clic
let contadorIntentos = 0; 

function adivinar() {
    // 1. Leer y convertir el número del input
    const intento = Number(document.getElementById("inp-numero").value);
    const feedback = document.getElementById("feedback");
    const infoIntentos = document.getElementById("info-intentos"); // Nuevo elemento

    // Sumar 1 intento cada vez que se presiona el botón
    contadorIntentos++;
    infoIntentos.innerHTML = "Intentos realizados: " + contadorIntentos;

    // 2. ¿Acertó?
    if (intento === NUMERO_SECRETO) {
        feedback.innerHTML = "🎉 ¡¡CORRECTO!! Lo lograste en " + contadorIntentos + " intentos.";
        feedback.style.color = "#7C3AED";
        feedback.style.fontSize = "40px";
    } 
    // 3. ¿El número es menor que el secreto?
    else if (intento < NUMERO_SECRETO) {
        feedback.innerHTML = "🥶 ¡Más caliente! El número es mayor";
        feedback.style.color = "#2563EB";
        feedback.style.fontSize = "24px";
    } 
    // 4. Si no, el número es mayor
    else {
        feedback.innerHTML = "🔥 ¡Más frío! El número es menor";
        feedback.style.color = "#DC2626";
        feedback.style.fontSize = "24px";
    }
}