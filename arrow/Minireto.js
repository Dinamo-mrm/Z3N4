function evaluarClima() {
    // 1. Leer elementos
    const temp = Number(document.getElementById("inp-temp").value);
    const resultado = document.getElementById("resultado-clima");
    const consejo = document.getElementById("consejo-ropa"); // Nuevo elemento

    let ropa = ""; // Variable para guardar el ícono/texto

    // 2. Lógica de Temperatura y Colores
    if (temp > 35) {
        resultado.innerHTML = "🔥 Calor extremo: " + temp + "°C";
        resultado.style.color = "#DC2626";
        document.body.style.background = "#FEF2F2";
    } else if (temp > 25) {
        resultado.innerHTML = "☀ Calor agradable: " + temp + "°C";
        resultado.style.color = "#EA580C";
        document.body.style.background = "#FFF7ED";
    } else if (temp > 15) {
        resultado.innerHTML = "🌤 Templado: " + temp + "°C";
        resultado.style.color = "#16A34A";
        document.body.style.background = "#F0FDF4";
    } else if (temp > 0) {
        resultado.innerHTML = "🧥 Frío: " + temp + "°C";
        resultado.style.color = "#2563EB";
        document.body.style.background = "#EFF6FF";
    } else {
        resultado.innerHTML = "🥶 Bajo cero: " + temp + "°C";
        resultado.style.color = "#7C3AED";
        document.body.style.background = "#F5F3FF";
    }

    // 3. RESOLUCIÓN DEL MINI-RETO (Lógica de ropa)
    if (temp > 30) {
        ropa = "👕 Usa camiseta";
    } else if (temp < 10) {
        ropa = "🧣 Usa bufanda y abrigo";
    } else {
        ropa = "👟 Ropa cómoda"; // Opción extra para clima medio
    }

    // Mostrar el consejo en el HTML
    consejo.innerText = ropa;
}