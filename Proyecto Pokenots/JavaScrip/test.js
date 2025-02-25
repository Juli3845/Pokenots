document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('test-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const inteligencia = document.querySelector('input[name="inteligencia"]:checked')?.value;
        const debilidad = document.querySelector('input[name="debilidad"]:checked')?.value;
        const ataque = document.querySelector('input[name="ataque"]:checked')?.value;
        const frase = document.querySelector('input[name="frase"]:checked')?.value;

        if (!inteligencia || !debilidad || !ataque || !frase) {
            resultDiv.innerText = "¡Responde todas las preguntas!";
            resultDiv.style.display = "block";
            return;
        }

        let resultado = '';

        if (inteligencia === 'D' && ataque === 'A') {
            resultado = "Eres el Pokenot Sir Meow, pero nadie te toma en serio.";
        } else if (debilidad === 'D' && frase === 'C') {
            resultado = "Eres el Pokenot Flojo, solo luchas si hay comida.";
        } else if (ataque === 'B' && inteligencia === 'B') {
            resultado = "Eres el Pokenot Torpe, siempre terminas dañándote a ti mismo.";
        } else if (frase === 'D' && ataque === 'D') {
            resultado = "Eres el Pokenot Desaparecido, nadie sabe si existes de verdad.";
        } else {
            resultado = "Eres un Pokenot único e irreconocible, ¡felicidades!";
        }

        resultDiv.innerText = resultado;
        resultDiv.style.display = "block";
    });
});
