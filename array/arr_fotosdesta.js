// Array de objetos: cada uno representa una imagen con metadatos 
const fotos = [ 
  { 
    nombre:    "Montaña Nevada", 
    url:       "https://picsum.photos/seed/mountain/400/300", 
    categoria: "Naturaleza", 
    descripcion: "Picos cubiertos de nieve al amanecer." 
  }, 
  { 
    nombre:    "Playa Tropical", 
    url:       "https://picsum.photos/seed/beach/400/300", 
    categoria: "Mar", 
    descripcion: "Aguas cristalinas y arena blanca." 
  }, 
  { 
    nombre:    "Bosque Profundo", 
    url:       "https://picsum.photos/seed/forest/400/300", 
    categoria: "Naturaleza", 
    descripcion: "Árboles centenarios y neblina suave." 
  }, 
  { 
    nombre:    "Ciudad de Noche", 
    url:       "https://picsum.photos/seed/city/400/300", 
    categoria: "Urbano", 
    descripcion: "Rascacielos iluminados al anochecer." 
  }, 
  { 
    nombre:    "Desierto Rojo", 
    url:       "https://picsum.photos/seed/desert/400/300", 
    categoria: "Naturaleza", 
    descripcion: "Dunas de arena bajo un cielo naranja." 
  }, 
  { 
    nombre:    "Lago de Montaña", 
    url:       "https://picsum.photos/seed/lake/400/300", 
    categoria: "Agua", 
    descripcion: "Reflejo perfecto de los picos en el agua." 
  }, 
]; 
 
function renderGaleria() { 
  const galeria = document.getElementById("galeria"); 
  galeria.innerHTML = ""; 
 
  for (let i = 0; i < fotos.length; i++) { 
    const foto = fotos[i];  // accedemos al objeto en posición i 
 
    // Construimos el HTML de cada tarjeta usando las propiedades del objeto 
    galeria.innerHTML += 
      "<div class=\"tarjeta\" onclick=\"verDetalle(" + i + ")\">" + 
      "  <img src=\"" + foto.url + "\" alt=\"" + foto.nombre + "\">" + 
      "  <div class=\"tarjeta-info\">" + 
      "    <div class=\"tarjeta-nombre\">" + foto.nombre + "</div>" + 
      "    <span class=\"badge-cat\">" + foto.categoria + "</span>" + 
      "  </div>" + 
      "</div>"; 
  } 
} 
 
function verDetalle(i) { 
  const foto  = fotos[i]; 
  const modal = document.getElementById("modal-info"); 
  modal.style.display = "block"; 
  modal.innerHTML = 
    "<strong>📸 " + foto.nombre + "</strong><br>" + 
    "<em>Categoría: " + foto.categoria + "</em><br>" + 
    "<p>" + foto.descripcion + "</p>"; 
} 
 
renderGaleria();