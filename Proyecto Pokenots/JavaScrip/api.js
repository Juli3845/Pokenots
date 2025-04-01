document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://retoolapi.dev/fv4HCx/Pokenot";
    
    // Elementos del formulario
    const form = document.getElementById("pokenot-form");
    const nombreInput = document.getElementById("nombre");
    const tipoInput = document.getElementById("tipo");
    const valoracionInput = document.getElementById("valoracion");
    const canvas = document.getElementById("dibujo-canvas");
    const ctx = canvas.getContext("2d");
    
    // Elementos del generador aleatorio
    const generarBtn = document.getElementById("generar-pokenot-btn");
    const nombreElem = document.getElementById("pokenot-nombre");
    const imagenElem = document.getElementById("pokenot-imagen");
    const tipoElem = document.getElementById("pokenot-tipo");
    const calificacionElem = document.getElementById("pokenot-calificacion");

    // Controles del dibujo
    const colorPincel = document.getElementById("color-pincel");
    const grosorPincel = document.getElementById("grosor-pincel");
    const clearButton = document.getElementById("clear-canvas");

    // Variables para dibujar
    let painting = false;
    let colorActual = colorPincel.value;
    let grosorActual = grosorPincel.value;
    
    // Configuración inicial del pincel
    ctx.strokeStyle = colorActual;
    ctx.lineWidth = grosorActual;

    // Cambiar color y grosor del pincel
    colorPincel.addEventListener("input", (e) => ctx.strokeStyle = e.target.value);
    grosorPincel.addEventListener("input", (e) => ctx.lineWidth = e.target.value);

    // Función para empezar a dibujar
    function startPosition(e) {
        painting = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    // Función para dibujar
    function draw(e) {
        if (!painting) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    // Detener el dibujo
    function endPosition() {
        painting = false;
    }

    // Eventos del canvas
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    // Limpiar el lienzo
    clearButton.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    // Obtener imagen del canvas
    function getCanvasImage() {
        return canvas.toDataURL("image/png");
    }

    //  AGREGAR UN POKENOT (POST)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nuevoPokenot = {
            nombre: nombreInput.value,
            tipo: tipoInput.value,
            valoracion: valoracionInput.value,
            dibujo: getCanvasImage() // Convertir el dibujo en una imagen
        };

        try {
            await fetch(apiURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoPokenot)
            });

            form.reset();
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
            alert("Pokenot agregado con éxito");
        } catch (error) {
            console.error("Error al agregar un Pokenot:", error);
        }
    });

    // OBTENER UN POKENOT ALEATORIO (GET)
    generarBtn.addEventListener("click", async () => {
        try {
            const respuesta = await fetch(apiURL);
            const datos = await respuesta.json();

            if (datos.length > 0) {
                const pokenotAleatorio = datos[Math.floor(Math.random() * datos.length)];

                // Mostrar los datos del Pokenot
                nombreElem.textContent = pokenotAleatorio.nombre;
                imagenElem.src = pokenotAleatorio.dibujo;
                imagenElem.style.display = "block"; // Mostrar imagen
                tipoElem.textContent = `Tipo: ${pokenotAleatorio.tipo}`;
                calificacionElem.textContent = `Calificación: ${'★'.repeat(pokenotAleatorio.valoracion)}`;
            }
        } catch (error) {
            console.error("Error al obtener el Pokenot aleatorio:", error);
        }
    });

    // EDITAR UN POKENOT (PUT)
    async function actualizarPokenot(id) {
        const nuevoNombre = prompt("Nuevo nombre:");
        const nuevoTipo = prompt("Nuevo tipo:");
        const nuevaValoracion = prompt("Nueva valoración:");

        if (!nuevoNombre || !nuevoTipo || !nuevaValoracion) return alert("Todos los campos son obligatorios");

        try {
            await fetch(`${apiURL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: nuevoNombre, tipo: nuevoTipo, valoracion: nuevaValoracion })
            });

            alert("Pokenot actualizado");
        } catch (error) {
            console.error("Error al actualizar el Pokenot:", error);
        }
    }

});
