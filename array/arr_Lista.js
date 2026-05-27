// 1. Array con 8 frutas (puedes cambiarlas por tus favoritas)
const frutas = [
    "🍎 Manzana", "🍌 Banana", "🍇 Uvas", "🍓 Fresa", 
    "🥭 Mango", "🥝 Kiwi", "🍍 Piña", "🍊 Naranja"
];

function mostrarLista() {
    const lista = document.getElementById("lista-frutas");
    lista.innerHTML = ""; // Limpiamos antes de empezar

    // 4. El bucle recorre los 8 elementos
    for (let i = 0; i < frutas.length; i++) {
        
        // Bonus: Determinamos el color de fondo usando el operador residuo (%)
        // Si el índice es par, azul claro; si es impar, blanco.
        let colorFondo = (i % 2 === 0) ? "#e3f2fd" : "#ffffff";

        // 5. Creamos el ítem con:
        // - Estilo en línea para el fondo
        // - Numeración (i + 1) para que no empiece en 0
        const item = `
            <div style="background-color: ${colorFondo}; padding: 5px; border-bottom: 1px solid #ddd;">
                ${i + 1}. ${frutas[i]}
            </div>
        `;

        // 6. Agregamos al DOM
        lista.innerHTML += item;
    }
}