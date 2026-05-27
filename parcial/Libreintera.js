let contadorNotas = 0;

function agregarNota() {
  const input = document.getElementById('inp-texto');
  const libreta = document.getElementById('libreta');
  const texto = input.value.trim();

  // Validar que el campo no esté vacío
  if (texto === "") {
    alert("Por favor, escribe una NOTA.");
    return;
  }

  contadorNotas++;

  // Insertar nueva nota usando innerHTML +=
  libreta.innerHTML += `
    <div class="nota">
      <span class="contenido-texto">Nota #${contadorNotas}: ${texto}</span>
      <button class="btn-eliminar" onclick="eliminarNota(this)">Eliminar</button>
    </div>
  `;

  // Limpiar el input y poner el foco de nuevo
  input.value = "";
  input.focus();
}

function eliminarNota(elemento) {
  // Eliminamos el padre del botón (el div con clase 'nota')
  elemento.parentElement.remove();
  
  // Opcional: Renumerar las notas para que sigan ordenadas
  renumerarNotas();
}

function borrarTodo() {
  const libreta = document.getElementById('libreta');
  libreta.innerHTML = ""; // Limpia el contenedor
  contadorNotas = 0;      // Reinicia el contador global
}

function renumerarNotas() {
  const notas = document.querySelectorAll('.nota');
  contadorNotas = notas.length; // Actualiza el contador al total restante

  notas.forEach((nota, index) => {
    const span = nota.querySelector('.contenido-texto');
    const textoSolo = span.innerText.split(': ')[1]; // Recuperamos solo el texto de la nota
    span.innerText = `Nota #${index + 1}: ${textoSolo}`;
  });
}