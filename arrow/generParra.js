// Contador global de notas
let contadorNotas = 0;

function agregarNota() {
    // 1. Leer el texto del input
    const inputElement = document.getElementById("inp-texto");
    const texto = inputElement.value;

    // 2. Validar que no esté vacío
    if (texto.trim() === "") {
        alert("Escribe algo antes de agregar la nota");
        return;
    }

    // 3. Subir el contador
    contadorNotas = contadorNotas + 1;

    // --- SOLUCIÓN DEL RETO ---
    // Obtenemos la hora actual del sistema
    const horaActual = new Date().toLocaleTimeString();
    // -------------------------

    // 4. Crear el HTML de la nueva nota (ahora con la hora incluida)
    const nuevaNota = `
        <div class="nota">
            <strong>Nota #${contadorNotas}</strong> 
            <small>(${horaActual})</small>: 
            <p>${texto}</p>
        </div>
    `;

    // 5. AGREGAR (+=) al contenido existente
    document.getElementById("libreta").innerHTML += nuevaNota;

    // 6. Limpiar el input para la próxima nota
    inputElement.value = "";
}

function borrarTodo() {
    document.getElementById("libreta").innerHTML = "";
    contadorNotas = 0;
}