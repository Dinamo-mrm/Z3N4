// Array de objetos actualizado
const fotos = [
  { nombre: "Montaña Nevada", url: "https://picsum.photos/seed/mountain/400/300", categoria: "Naturaleza", descripcion: "Picos cubiertos de nieve al amanecer.", likes: 0, destacada: true },
  { nombre: "Playa Tropical", url: "https://picsum.photos/seed/beach/400/300", categoria: "Mar", descripcion: "Aguas cristalinas y arena blanca.", likes: 0, destacada: false },
  { nombre: "Bosque Profundo", url: "https://picsum.photos/seed/forest/400/300", categoria: "Naturaleza", descripcion: "Árboles centenarios y neblina suave.", likes: 0, destacada: false },
  { nombre: "Ciudad de Noche", url: "https://picsum.photos/seed/city/400/300", categoria: "Urbano", descripcion: "Rascacielos iluminados al anochecer.", likes: 0, destacada: true },
  { nombre: "Desierto Rojo", url: "https://picsum.photos/seed/desert/400/300", categoria: "Naturaleza", descripcion: "Dunas de arena bajo un cielo naranja.", likes: 0, destacada: false },
  { nombre: "Lago de Montaña", url: "https://picsum.photos/seed/lake/400/300", categoria: "Agua", descripcion: "Reflejo perfecto de los picos en el agua.", likes: 0, destacada: true },
];

function renderGaleria() {
  const galeria = document.getElementById("galeria");
  const filtro = document.getElementById("filtroCategoria").value;
  
  galeria.innerHTML = ""; // Limpiar galería antes de renderizar

  for (let i = 0; i < fotos.length; i++) {
    const foto = fotos[i];

    // Lógica de Filtro
    if (filtro !== "Todas" && foto.categoria !== filtro) {
      continue; // Salta esta iteración si no coincide con la categoría
    }

    // Bonus: Borde dorado si es destacada
    const estiloDestacado = foto.destacada ? "border: 4px solid gold; transform: scale(1.05);" : "border: 1px solid #ddd;";

    // Construcción de la tarjeta con Template Literals
    galeria.innerHTML += `
      <div class="tarjeta" style="${estiloDestacado} margin: 10px; padding: 10px; display: inline-block; width: 250px;">
        <img src="${foto.url}" alt="${foto.nombre}" style="width: 100%;" onclick="verDetalle(${i})">
        <h3>${foto.nombre}</h3>
        <p><small>${foto.categoria}</small></p>
        <div class="acciones">
          <button onclick="darLike(${i})">❤ ${foto.likes}</button>
          <button onclick="verDetalle(${i})">Info</button>
        </div>
      </div>
    `;
  }
}

// Reto: Incrementar Likes
function darLike(i) {
  fotos[i].likes++;
  renderGaleria(); // Volvemos a dibujar para ver el cambio
}

function verDetalle(i) {
  const foto = fotos[i];
  const modal = document.getElementById("modal-info");
  modal.style.display = "block";
  modal.innerHTML = `
    <h3>📸 ${foto.nombre}</h3>
    <p><strong>Categoría:</strong> ${foto.categoria}</p>
    <p>${foto.descripcion}</p>
    <button onclick="this.parentElement.style.display='none'">Cerrar</button>
  `;
}

// Ejecución inicial
renderGaleria();