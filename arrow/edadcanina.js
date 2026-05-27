const FACTOR_CANINO = 7;

function calcularEdadCanina() {
    // 1. Leer el valor del input
    const valorTexto = document.getElementById("edad-humana").value;
    
    // 2. Convertir a número
    const edadHumana = Number(valorTexto);

    // 3. Validar entrada
    if (edadHumana <= 0 || valorTexto === "") {
        document.getElementById("resultado").innerHTML = "⚠ Por favor escribe una edad válida";
        return;
    }

    // 4. Hacer el cálculo
    const edadCanina = edadHumana * FACTOR_CANINO;

    // --- SOLUCIÓN DEL MINI-RETO ---
    let mensajeExtra = "";

    if (edadCanina < 35) {
        mensajeExtra = " ¡Eres un cachorro! 🐶";
    } else if (edadCanina >= 35 && edadCanina <= 70) {
        mensajeExtra = " Eres un adulto 🐕";
    } else {
        mensajeExtra = " Eres un veterano 🎖";
    }

    // 5. Mostrar el resultado combinado
    document.getElementById("resultado").innerHTML = 
        "🐾 En años perro tienes: " + edadCanina + " años." + "<br><strong>" + mensajeExtra + "</strong>";
}