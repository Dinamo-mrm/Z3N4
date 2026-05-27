    // 1. Usamos un número para los estados: 0=Triste, 1=Feliz, 2=Enojado
    let estado = 0; 

    function cambiarAnimo() {
        const emojiDiv = document.getElementById("emoji");
        const mensajeP = document.getElementById("mensaje");

        if (estado === 0) {
            // De Triste (0) pasamos a Feliz (1)
            document.body.style.backgroundColor = "#F9E79F"; // Amarillo
            emojiDiv.innerHTML = "😄";
            mensajeP.innerHTML = "¡Hoy va a ser un gran día!";
            estado = 1; 

        } else if (estado === 1) {
            // De Feliz (1) pasamos a Enojado (2)
            document.body.style.backgroundColor = "#F1948A"; // Rojo
            emojiDiv.innerHTML = "😠";
            mensajeP.innerHTML = "¡Me estoy empezando a molestar!";
            estado = 2;

        } else if (estado === 2) {
            ocument.body.style.backgroundColor = "#642f1b"; // verde
            emojiDiv.innerHTML = "🤬";
            mensajeP.innerHTML = "¡embejucao!";
            estado = 3;
            
         } else {
            // De Enojado (2) volvemos a Triste (0)
            document.body.style.backgroundColor = "#AED6F1"; // Azul
            emojiDiv.innerHTML = "😢";
            mensajeP.innerHTML = "Hoy no es mi mejor día...";
            estado = 0;
        }
    }