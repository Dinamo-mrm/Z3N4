function agregarNota() {
  const input = document.getElementById("inp-texto");
  const texto = input.value;

  if (texto === "") {
    alert("Escribe algo antes de agregar la nota");
    return;
  }

  contadorNotas++; // Forma abreviada de contadorNotas = contadorNotas + 1

  // OBTENER LA HORA (Mini-reto)
  const hora = new Date().toLocaleTimeString();

  // 4. Crear el HTML con la hora incluida
  const nuevaNota = `
    <div class="nota">
      <strong>Nota #${contadorNotas}</strong> [${hora}]: ${texto}
    </div>
  `;

  // 5. Acumular contenido
  document.getElementById("libreta").innerHTML += nuevaNota;

  // 6. Limpiar
  input.value = "";
}