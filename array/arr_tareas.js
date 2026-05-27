// 1. Array de objetos inicial
let tareas = [
    { texto: "Aprender arrays en JS", completada: false, prioridad: "alta" },
    { texto: "Completar el taller 1", completada: true, prioridad: "baja" },
];

function agregarTarea() {
    const input = document.getElementById("inp-tarea");
    const prioridad = document.getElementById("sel-prioridad").value;
    
    if (input.value === "") return;

    // 2. Creamos el objeto con la nueva propiedad "prioridad"
    const nuevaTarea = {
        texto: input.value,
        completada: false,
        prioridad: prioridad
    };

    tareas.push(nuevaTarea);
    input.value = "";
    dibujarTareas();
}

function toggleTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    dibujarTareas();
}

// Mini-reto: Bonus - Limpiar completadas
function limpiarCompletadas() {
    // Filtramos el array para quedarnos solo con las NO completadas
    tareas = tareas.filter(t => !t.completada);
    dibujarTareas();
}

function dibujarTareas() {
    const contenedor = document.getElementById("lista-tareas");
    const contenedorContador = document.getElementById("contador");
    contenedor.innerHTML = "";
    
    let completadasCount = 0;

    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];

        // Mini-reto: Contador
        if (tarea.completada) completadasCount++;

        // Mini-reto: Emojis de prioridad
        let emojiPrioridad = "";
        if (tarea.prioridad === "alta") emojiPrioridad = "🔴";
        else if (tarea.prioridad === "media") emojiPrioridad = "🟡";
        else emojiPrioridad = "🟢";

        const checkEmoji = tarea.completada ? "✅" : "⬜";
        const claseCSS = tarea.completada ? "tarea completada" : "tarea";

        // Renderizado de la tarea
        contenedor.innerHTML += `
            <div class="${claseCSS}" onclick="toggleTarea(${i})">
                <span>${checkEmoji}</span>
                <span style="margin-left: 10px;">${emojiPrioridad} ${tarea.texto}</span>
            </div>
        `;
    }

    // Actualizar texto del contador
    contenedorContador.innerText = `${completadasCount} completadas de ${tareas.length} totales`;
}

// Dibujar al cargar
dibujarTareas();