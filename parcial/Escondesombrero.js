const objetosData = [
  { id: "conejo", nombre: "Conejo", emoji: "🐰", visible: true },
  { id: "sombrero", nombre: "Sombrero", emoji: "🎩", visible: true },
  { id: "paloma", nombre: "Paloma", emoji: "🕊️", visible: true }
];

const zonaMagica = document.getElementById("zona-magica");
const btnGlobal = document.getElementById("btnAlternarTodo");

function renderizar() {
  // 1. Limpiar el contenedor antes de redibujar
  zonaMagica.innerHTML = "";

  // 2. Recorrer el array y construir el HTML de cada objeto
  objetosData.forEach((item) => {
    const divObjeto = document.createElement("div");
    divObjeto.className = "objeto";

    // Decidir texto del botón y mensaje de estado
    const textoBoton = item.visible ? `Esconder ${item.nombre}` : `Mostrar ${item.nombre}`;
    const mensajeEstado = item.visible 
      ? '<span class="visible-text">🟢 Visible</span>' 
      : '<span class="oculto-text">🔴 Oculto</span>';

    // Construir estructura interna
    divObjeto.innerHTML = `
      <div class="emoji ${item.visible ? '' : 'oculto'}">${item.emoji}</div>
      <button onclick="alternar('${item.id}')">${textoBoton}</button>
      <span class="estado">${mensajeEstado}</span>
    `;

    zonaMagica.appendChild(divObjeto);
  });
}

function alternar(id) {
  // Buscar el objeto en el array por su ID y cambiar su estado booleano
  const item = objetosData.find(obj => obj.id === id);
  if (item) {
    item.visible = !item.visible;
  }
  // Volver a dibujar todo para reflejar el cambio
  renderizar();
}

function alternarTodo() {
  // Lógica: Si al menos uno está oculto, los mostramos todos.
  // De lo contrario (si todos están visibles), los ocultamos todos.
  const hayOcultos = objetosData.some(obj => obj.visible === false);

  objetosData.forEach(obj => {
    obj.visible = hayOcultos; // Si hay ocultos, todos pasan a true. Si no, todos a false.
  });

  renderizar();
}

// Eventos iniciales
btnGlobal.onclick = alternarTodo;
renderizar(); // Llamada inicial para mostrar los objetos al cargar