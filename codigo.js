let palabras = [
    'tomate', 'clima', 'programa', 'adivinanza', 'espeluznante',
    'bosque', 'increible', 'computador', 'guitarra', 'aspiradora',
    'canto', 'poligono', 'licuadora', 'mascarilla', 'murcielago',
    'lluvia', 'mantenimiento', 'longitud', 'espectro', 'esfuerzo',
    'velocidad', 'volcan', 'victorioso', 'madriguera', 'poderoso',
    'perfume','teclado','medidas','porcentaje','refrigerador',
    'paralelepipedos','antibioticos','adaptacion','estimulacion',
    'funcional','fisico','diagnostico','ligamento','nervios','pantorrilla',
    'pulcritud'
]

let palabraIncognita = palabras[Math.floor(Math.random()*palabras.length)]
let numeroLetras = palabraIncognita.length;
let letrasIncognitas = [];
let vidas = 9;
let ahorcado = document.getElementById('juego-img')

function rendirse(e){
    e.preventDefault()
    swal.fire({
        title:'Game Over!', 
        width:'500px',
        text: `La palabra era '${palabraIncognita}'`,
        confirmButtonText: 'Ok',
        confirmButtonColor: 'black',
        background: `
        url('gback.gif')
        center`
    })
    .then((value) => {
        if(value.isConfirmed){
            location.reload();
        }
    })
}

function letras(e){

    var letraIngreso = document.getElementById('letra').value;
    var letraIngresada = letraIngreso.toLowerCase()
    e.preventDefault()
    form = document.getElementById("form").reset();

    if(letraIngresada === ''){
        swal.fire({
            title:'Ingrese una Letra', 
            width:'500px',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'black',
            confirmButtonColor: 'black'
        })

    }else if(palabraIncognita.indexOf(letraIngresada) === -1){
        vidas--;

        ahorcado.innerHTML = (`<img src = ${vidas}.png id='juego-img-ahorcado'>`)

            if(vidas===0){
                swal.fire({
                    title:'Game Over!', 
                    width:'500px',
                    showDenyButton: true,
                    denyButtonText:'Rendirse',
                    denyButtonColor:'black',
                    confirmButtonText: 'Jugar de nuevo',
                    confirmButtonColor: 'black',
                    background: `
                    url('gback.gif')
                    center`})
                .then((value) => {
                    if(value.isConfirmed){
                        location.reload();
                    }
                    else{
                        swal.fire({
                        title:'Game Over!', 
                        width:'500px',
                        text: `La palabra era '${palabraIncognita}'`,
                        confirmButtonText: 'Ok',
                        confirmButtonColor: 'black',
                        background: `
                        url('gback.gif')
                        center`})  
                        .then((value) => {
    
                            if(value.isConfirmed){
                                location.reload();
                            }
                        })
                    }
                })
            }
            

    }else{
        for(var j = 0; j < palabraIncognita.length; j++){
            if(palabraIncognita[j] === letraIngresada){
            letrasIncognitas[j] = letraIngresada
            numeroLetras--;
            respuesta.innerHTML = (letrasIncognitas.join(''))
                if(numeroLetras === 0){
                    swal.fire({
                        title:'GANADOR', 
                        text:'¿Deseas jugar de nuevo?',
                        width:'500px',
                        showDenyButton: true,
                        denyButtonText:'No',
                        denyButtonColor:'black',
                        confirmButtonText: 'Si',
                        confirmButtonColor: 'black',})
                    .then((value) => {
    
                        if(value.isConfirmed){
                            location.reload();
                        }
                    })
                }
            }
        }
    }

}

function adivinar(e){
    e.preventDefault(e)
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Adivina',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        background: `black`
      }).queue([
        {
          title: '¿Cual es la palabra?'
        },
      ]).then((result) => {
        if (result.value) {
          var answers = (result.value).join('').toLowerCase()
          if(answers == palabraIncognita){
            swal.fire({
                title:'GANADOR', 
                text:`La palabra era ${(palabraIncognita)}. ¿Deseas jugar de nuevo?`,
                width:'400px',
                showDenyButton: true,
                denyButtonText:'No',
                denyButtonColor:'black',
                confirmButtonText: 'Si',
                confirmButtonColor: 'black',})
          }else{
            swal.fire({
                title:'Game Over!', 
                width:'500px',
                text: `La palabra era '${palabraIncognita}'`,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'black',
                background: `
                url('gback.gif')
                center`})
                .then((value) => {
    
                    if(value.isConfirmed){
                        location.reload();
                    }
                })
          }
        }
      })



}



for (let i = 0; i < palabraIncognita.length; i++){
    letrasIncognitas[i] = '_'
    var respuesta = document.getElementById('juego-respuesta');
    respuesta.innerHTML = (letrasIncognitas.join(''))
}

let b2 = document.getElementById('b2')
b2.addEventListener('click', rendirse)
let b1 = document.getElementById('b1')
b1.addEventListener('click', letras)

let b3 = document.getElementById('b3')
b3.addEventListener('click', adivinar)