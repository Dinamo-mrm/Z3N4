function buscar() {
  const termino = document.getElementById("inp-buscar").value.toLowerCase();
  const lista = document.getElementById("resultado-lista");
  
  // 1. Filtrar el array en una sola línea
  const encontrados = paises.filter(pais => 
    pais.toLowerCase().includes(termino)
  );

  // 2. Actualizar el contador (usando Template Literals)
  document.getElementById("resultado-conteo").innerText = 
    `${encontrados.length} de ${paises.length} países`;

  // 3. Renderizar resultados (más rápido que múltiples += innerHTML)
  if (encontrados.length === 0) {
    lista.innerHTML = `<div>Sin resultados para: ${termino}</div>`;
  } else {
    lista.innerHTML = encontrados
      .map(pais => `<div class="pais-item">${pais}</div>`)
      .join("");
  }
}