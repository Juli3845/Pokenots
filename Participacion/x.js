
Jedi = {
    "personaje": {
      "nombre": "Luke Skywalker",
      "edad": 53,
      "origen": {
        "planeta": "Tatooine",
        "galaxia": "Lejana"
      },
      "habilidades": ["Uso de la Fuerza", "Combate con sable de luz", "Pilotaje"]
    }
  }

 console.log(datos.Jedi.personaje.nombre); // "Luke Skywalker"
console.log(datos.Jedi.personaje.origen.planeta); // "Tatooine"
console.log(datos.Jedi.personaje.habilidades[0]); // "Uso de la Fuerza"
