let palabras = [
  "tomate",
  "clima",
  "programa",
  "adivinanza",
  "espeluznante",
  "bosque",
  "imposible",
  "computador",
  "guitarra",
  "aspiradora",
  "canto",
  "figura",
  "licuadora",
  "mascarilla",
  "animal",
  "lluvia",
  "mantenimiento",
  "longitud",
  "espectro",
  "esfuerzo",
  "velocidad",
  "utensilios",
  "victorioso",
  "madriguera",
  "poderoso",
  "perfume",
  "teclado",
  "medidas",
  "porcentaje",
  "refrigerador",
  "poliedro",
  "infecciones",
  "paralelogramos",
  "microorganismos",
  "funcional",
  "movimientos",
  "profesionales",
  "ligamento",
  "nervios",
  "pantorrilla",
  "pulcritud",
  "delicadeza",
  "minuciosidad",
  "elegancia",
  "exquisitez",
  "extraordinario",
  "comportamiento",
  "finura",
  "equivalente",
];

let palabraIncognita =
  palabras[Math.trunc(Math.random() * palabras.length) + 1];
let numeroLetras = palabraIncognita.length;
let letrasIncognitas = [];
let vidas = 9;
let ahorcado = document.getElementById("juego-img");

function rendirse(e) {
  e.preventDefault();
  swal
    .fire({
      title: "Game Over!",
      width: "500px",
      text: `La palabra era '${palabraIncognita}'`,
      confirmButtonText: "Ok",
      confirmButtonColor: "black",
      background: ` url('gback.gif') center`,
    })
    .then((value) => {
      if (value.isConfirmed) {
        window.location.reload();
      }
    });
}

function letras(e) {
  var letraIngreso = document.getElementById("letra").value;
  var letraIngresada = letraIngreso.toLowerCase();
  e.preventDefault();
  form = document.getElementById("form").reset();

  if (letraIngresada === "") {
    swal.fire({
      title: "Ingrese una Letra",
      width: "500px",
      confirmButtonText: "Ok",
      confirmButtonColor: "black",
    });
  } else if (palabraIncognita.indexOf(letraIngresada) === -1) {
    vidas--;

    ahorcado.innerHTML = `<img src = ${vidas}.png id='juego-img-ahorcado'>`;
    if (vidas === 0) {
      swal
        .fire({
          title: "Game Over!",
          width: "500px",
          showDenyButton: true,
          denyButtonText: "Rendirse",
          denyButtonColor: "black",
          confirmButtonText: "Jugar de nuevo",
          confirmButtonColor: "black",
          background: `url('gback.gif') center`,
        })
        .then((value) => {
          if (value.isConfirmed) {
            window.location.reload();
          } else {
            rendirse(e);
          }
        });
    }
  } else {
    for (var j = 0; j < palabraIncognita.length; j++) {
      if (palabraIncognita[j] === letraIngresada) {
        letrasIncognitas[j] = letraIngresada;
        numeroLetras--;
        respuesta.innerHTML = letrasIncognitas.join("");
        if (numeroLetras === 0) {
          swal
            .fire({
              title: "GANADOR",
              text: "¿Deseas jugar de nuevo?",
              width: "500px",
              showDenyButton: true,
              denyButtonText: "No",
              denyButtonColor: "black",
              confirmButtonText: "Si",
              confirmButtonColor: "black",
            })
            .then((value) => {
              if (value.isConfirmed) {
                window.location.reload();
              }
            });
        }
      }
    }
  }
}

function adivinar(e) {
  e.preventDefault(e);
  Swal.mixin({
    input: "text",
    confirmButtonText: "Adivina",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    background: `lightgray`,
  })
    .queue([
      {
        title: "¿Cual es la palabra?",
      },
    ])
    .then((result) => {
      if (result.value) {
        var answers = result.value.join("").toLowerCase();
        if (answers == palabraIncognita) {
          swal
            .fire({
              title: "GANADOR",
              text: `La palabra era ${palabraIncognita}. ¿Deseas jugar de nuevo?`,
              width: "400px",
              showDenyButton: true,
              denyButtonText: "No",
              denyButtonColor: "black",
              confirmButtonText: "Si",
              confirmButtonColor: "black",
            })
            .then((value) => {
              if (value.isConfirmed) {
                window.location.reload();
              }
            });
        } else {
          rendirse(e);
        }
      }
    });
}

for (let i = 0; i < palabraIncognita.length; i++) {
  letrasIncognitas[i] = "_";
  var respuesta = document.getElementById("juego-respuesta");
  respuesta.innerHTML = letrasIncognitas.join("");
}

let b2 = document.querySelector("#b2").addEventListener("click", rendirse);
let b1 = document.querySelector("#b1").addEventListener("click", letras);
let b3 = document.querySelector("#b3").addEventListener("click", adivinar);
