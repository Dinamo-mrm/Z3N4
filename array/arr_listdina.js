// --- CONFIGURACIÓN INICIAL ---
const LIMITE_MAXIMO = 10; // Máximo de invitados permitidos
let invitados = []; // Array vacío para almacenar los nombres

/**
 * Función principal para agregar un invitado
 */
function agregarInvitado() {
  const input = document.getElementById("inp-nombre");
  const nombre = input.value.trim(); // .trim() elimina espacios vacíos al inicio/final

  // Validación: No permitir nombres vacíos
  if (nombre === "") {
    alert("Escribe un nombre");
    return;
  }

  // 1. Verificar si ya alcanzamos el límite usando .length
  if (invitados.length >= LIMITE_MAXIMO) {
    alert("¡Lista llena! No hay más lugares.");
    return;
  }

  // 2. Agregar al array
  invitados.push(nombre);

  // 3. Limpiar input y devolver el foco para seguir escribiendo
  input.value = "";
  input.focus();

  // 4. Actualizar la interfaz (Contadores y Lista)
  actualizarContadores();
  dibujarLista();
}

/**
 * Función para actualizar las estadísticas (Mini-reto)
 */
function actualizarContadores() {
  // 5. Cálculos basados en .length
  const total = invitados.length;
  const libres = LIMITE_MAXIMO - total;
  
  // Cálculo de porcentaje: (parte / total * 100)
  const porcentaje = (total / LIMITE_MAXIMO * 100).toFixed(0);

  // 6. Actualizar textos en el HTML
  document.querySelector("#contador-total div").innerHTML = total;
  document.getElementById("quedan").innerHTML = libres;
  
  // Actualizar el nuevo panel de porcentaje (si existe en tu HTML)
  const txtPorcentaje = document.querySelector("#contador-porcentaje div");
  if (txtPorcentaje) txtPorcentaje.innerHTML = porcentaje + "%";

  // --- LÓGICA DEL MINI-RETO ---

  // A. Cambiar color del panel "Lugares libres" si quedan 3 o menos
  const panelLibres = document.getElementById("contador-max");
  if (libres <= 3) {
    panelLibres.style.background = "#E74C3C"; // Rojo claro/brillante
  } else {
    panelLibres.style.background = "#922B21"; // Rojo oscuro original
  }

  // B. Bonus: Aviso "Casi lleno" si supera 8 invitados
  // Buscamos un elemento con id "aviso-lleno" para mostrarlo u ocultarlo
  const aviso = document.getElementById("aviso-lleno");
  if (aviso) {
    if (total > 8) {
      aviso.style.display = "block";
    } else {
      aviso.style.display = "none";
    }
  }
}

/**
 * Función para renderizar la lista en el HTML
 */
function dibujarLista() {
  const lista = document.getElementById("lista-invitados");
  
  // Limpiar la lista antes de volver a dibujarla para no duplicar
  lista.innerHTML = "";

  // 7. Recorrer el array y crear los <li>
  for (let i = 0; i < invitados.length; i++) {
    lista.innerHTML += "<li>" + (i + 1) + ". " + invitados[i] + "</li>";
  }
}