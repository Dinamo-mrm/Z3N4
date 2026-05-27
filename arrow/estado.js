// 1. Variable de estado: 0 = Encendida, 1 = Tenue, 2 = Apagada
let estadoActual = 0; 

function toggleLuz() {
    const sala = document.getElementById("sala");
    const texto = document.getElementById("estado-texto");
    const bombillo = document.getElementById("bombillo");
    const boton = document.getElementById("btn-luz");

    if (estadoActual === 0) {
        // PASAR A LUZ TENUE 🕯️
        sala.style.backgroundColor = "#4B5563"; // Gris oscuro
        sala.style.color = "#FFFFFF";
        texto.innerHTML = "🕯️ Luz Tenue";
        bombillo.innerHTML = "🕯️";
        boton.innerHTML = "Apagar";
        estadoActual = 1;

    } else if (estadoActual === 1) {
        // PASAR A LUZ APAGADA 🌑
        sala.style.backgroundColor = "#111827"; // Negro
        sala.style.color = "#FFFFFF";
        texto.innerHTML = "🌑 Luz Apagada";
        bombillo.innerHTML = "🌑";
        boton.innerHTML = "Encender";
        estadoActual = 2;

    } else {
        // PASAR A LUZ ENCENDIDA 💡 (Volver al inicio)
        sala.style.backgroundColor = "#FFFFFF"; // Blanco
        sala.style.color = "#111827";
        texto.innerHTML = "💡 Luz Encendida";
        bombillo.innerHTML = "💡";
        boton.innerHTML = "Atenuar";
        estadoActual = 0;
    }
}