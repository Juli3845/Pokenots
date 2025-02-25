document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("reproductor");
    const playPauseBtn = document.getElementById("play-pause");
    const retrocederBtn = document.getElementById("retroceder");
    const avanzarBtn = document.getElementById("avanzar");
    const barraProgreso = document.getElementById("barra-progreso");
    const tiempoActual = document.getElementById("tiempo-actual");
    const tiempoTotal = document.getElementById("tiempo-total");

    // 🎵 Lista de canciones (URLs de los archivos de audio)
    const playlist = [
        "./Musica/chiptune-grooving.mp3",
        "./Musica/i-love-my-8-bit-game-console.mp3",
        "./Musica/the-return-of-the-8-bit-era.mp3"
    ];

    let indiceCancion = 0; // Guarda qué canción está sonando

    // Cargar la primera canción al inicio
    audio.src = playlist[indiceCancion];

    // Función para cambiar de canción
    function cambiarCancion(direccion) {
        if (direccion === "siguiente") {
            indiceCancion = (indiceCancion + 1) % playlist.length;
        } else if (direccion === "anterior") {
            indiceCancion = (indiceCancion - 1 + playlist.length) % playlist.length;
        }

        audio.src = playlist[indiceCancion];
        audio.play();
        playPauseBtn.textContent = "⏸️"; // Cambia el botón a pausa
    }

    // Reproducir/Pausar
    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "⏸️";
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶️";
        }
    });

    // Cambiar canción con los botones
    retrocederBtn.addEventListener("click", function () {
        cambiarCancion("anterior");
    });

    avanzarBtn.addEventListener("click", function () {
        cambiarCancion("siguiente");
    });

    // Pasar a la siguiente canción automáticamente cuando termina una
    audio.addEventListener("ended", function () {
        cambiarCancion("siguiente");
    });

    // Actualizar barra de progreso y tiempos
    audio.addEventListener("timeupdate", function () {
        let tiempoReproducido = formatearTiempo(audio.currentTime);
        let duracionTotal = audio.duration ? formatearTiempo(audio.duration) : "0:00";

        tiempoActual.textContent = tiempoReproducido;
        tiempoTotal.textContent = duracionTotal;

        if (!isNaN(audio.duration)) {
            barraProgreso.max = audio.duration;
            barraProgreso.value = audio.currentTime;
        }
    });

    // Permitir adelantar/retroceder manualmente con la barra
    barraProgreso.addEventListener("input", function () {
        audio.currentTime = barraProgreso.value;
    });

    // Función para formatear tiempo (min:seg)
    function formatearTiempo(segundos) {
        let min = Math.floor(segundos / 60);
        let sec = Math.floor(segundos % 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
    }
});
