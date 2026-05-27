function calcularEstadisticas() {
    if (notas.length === 0) {
        // Resetear valores si el array queda vacío
        document.getElementById("stat-prom").innerHTML = "0";
        document.getElementById("stat-estado").innerHTML = "-";
        return;
    }

    let suma = 0;
    let aprobados = 0;

    // 1. Cálculo de Suma y Aprobados en un solo bucle
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
        if (notas[i] >= 6) {
            aprobados++;
        }
    }

    const promedio = suma / notas.length;
    const reprobados = notas.length - aprobados;

    // 2. Lógica de Estado (Colores y Etiquetas)
    const elEstado = document.getElementById("stat-estado");
    if (promedio >= 9.0) {
        elEstado.innerHTML = "🏆 Excelente";
        elEstado.style.color = "#D4AF37"; // Dorado
    } else if (promedio >= 6.0) {
        elEstado.innerHTML = "✅ Aprobado";
        elEstado.style.color = "#27AE60"; // Verde
    } else {
        elEstado.innerHTML = "❌ Reprobado";
        elEstado.style.color = "#E74C3C"; // Rojo
    }

    // 3. Mínima y Máxima (Usando Math para simplificar)
    const maximo = Math.max(...notas);
    const minimo = Math.min(...notas);

    // 4. Actualizar Interfaz
    document.getElementById("stat-prom").innerHTML = promedio.toFixed(1);
    document.getElementById("stat-max").innerHTML = maximo;
    document.getElementById("stat-min").innerHTML = minimo;
    document.getElementById("stat-total").innerHTML = notas.length;
    
    // Mostrar fracción de aprobados (ej: 3/5)
    document.getElementById("stat-fraccion").innerHTML = `${aprobados} de ${notas.length} aprobadas`;
}

// BONUS: Eliminar última nota
function eliminarUltima() {
    if (notas.length > 0) {
        notas.pop(); // Elimina el último elemento
        calcularEstadisticas();
        dibujarBarras();
    }
}