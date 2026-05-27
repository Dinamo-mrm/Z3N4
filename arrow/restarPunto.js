let puntaje = 0;

function sumarPunto() {
    puntaje = puntaje + 1;
    actualizarMarcador();
    
    // Si llega a 10, felicitamos
    if (puntaje === 10) {
        document.getElementById("marcador").style.color = "#16A34A"; // Verde
        alert("🎉 ¡Alcanzaste 10 puntos!");
    }
}

function restarPunto() {
    // 1. Restamos 1 al puntaje
    puntaje = puntaje - 1;
    actualizarMarcador();

    // 2. Condición: Si llega a -5, Game Over
    if (puntaje === -5) {
        const marcador = document.getElementById("marcador");
        marcador.style.color = "#DC2626"; // Rojo intenso
        alert("💀 ¡Game Over! Has perdido demasiados puntos.");
    }
}

function reiniciar() {
    puntaje = 0;
    actualizarMarcador();
    document.getElementById("marcador").style.color = "#2563EB"; // Azul original
}

// Función auxiliar para no repetir código (DRY: Don't Repeat Yourself)
function actualizarMarcador() {
    document.getElementById("marcador").innerHTML = puntaje;
}