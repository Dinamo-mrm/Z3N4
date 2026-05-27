function calcularProgreso(completadas, totales)
{
    let porcentaje = (completadas / totales) * 100;
    return porcentaje;
}

// Usamos el resultado para guardarlo y mostrarlo en una variable

let progresoActual = calcularProgreso(5, 10);
console.log("Tu progreso es: " + progresoActual + "%");