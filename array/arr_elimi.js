let elementos = ["🥑 Aguacate", "🍋 Limón", "🫐 Arándanos", "🍑 Durazno"];
let ultimoEliminado = null; // Variable para el Bonus

function agregar() {
    const texto = document.getElementById("inp-elem").value;
    if (!texto) return;
    elementos.push(texto);
    document.getElementById("inp-elem").value = "";
    render();
}

function eliminar(indice) {
    // Reto: Agregamos confirmación
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
        // Bonus: Guardamos el elemento antes de borrarlo para poder "Deshacer"
        ultimoEliminado = elementos[indice]; 
        
        elementos.splice(indice, 1);
        render();
    }
}

// Reto: Función para vaciar todo el array
function limpiarTodo() {
    if (elementos.length === 0) return;
    
    if (confirm("¿Vaciar toda la lista?")) {
        elementos = [];
        render();
    }
}

// Bonus: Función para recuperar el último borrado
function deshacer() {
    if (ultimoEliminado !== null) {
        elementos.push(ultimoEliminado);
        ultimoEliminado = null; // Limpiamos la papelera tras recuperar
        render();
    } else {
        alert("No hay nada que deshacer");
    }
}

function render() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    if (elementos.length === 0) {
        contenedor.innerHTML = "<div>Lista vacía 💨</div>";
    } else {
        for (let i = 0; i < elementos.length; i++) {
            contenedor.innerHTML += `
                <div style="display:flex; justify-content:between; margin-bottom:5px;">
                    <span>${elementos[i]}</span>
                    <button onclick="eliminar(${i})">🗑 Eliminar</button>
                </div>`;
        }
    }
}

render();