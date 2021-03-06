const boton = document.querySelector('#snapButton');
const sketchContainer = document.querySelector('#sketch_container');
let lat,lon;
let capture;
let canvas;
let data;

let ancho = window.innerWidth;
let alto = window.innerHeight;

// let ancho = sketchContainer.offsetWidth;
// let alto = sketchContainer.offsetHeight;
// console.log(ancho, alto);

if(ancho > alto) {
    if(ancho > 700) { 
        ancho = 700;
    } else {
        ancho = sketchContainer.offsetWidth * 0.85;
    }
    alto = ancho * 3 / 4;
} else {
    ancho = sketchContainer.offsetWidth * 0.95;
    alto = ancho;
}

// console.log(ancho, alto);

boton.addEventListener('click', async () => {
    capture.loadPixels();
    let snap = capture.canvas.toDataURL('image/png', 1.0);
    let data = {snap};
    let message = JSON.stringify(data);
    // let index = 0;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body:  message,
        };
    
    await fetch('/photo/', options)
        .then(async (response) => { 
            console.log(response);   
            if (response.ok) {
                // Para mandar hacia otra pagina los datos del analisis
                let respuesta = await response.json();
                let edad = (Math.round(respuesta.body.age).toString());
                let emo = (respuesta.body.emotion);
                let probEmo = (respuesta.body.emotionProb.toString())
                let genero = (respuesta.body.gender);
                let probGen = (respuesta.body.genProb.toString())
                let indice = respuesta.body.index;
                window.location.assign(`./dataApp.html?edad=${edad}&emocion=${emo}&probEmo=${probEmo}&genero=${genero}&probGen=${probGen}&index=${indice}`)
            } else if(response === undefined){
                if(!alert('Algo ocurrio al tomar la foto, no se identifico el archivo')){window.location.reload();}
            }   else {
                if(!alert('Ocurrio un error al procesar la foto, intentalo de nuevo')){window.location.reload();}
            }
        })
        .catch(e => {
            if(!alert('Ocurrio un error al subir la foto, intentalo de nuevo')){window.location.reload();}
            console.log(e);
        });
});


function setup() {
    background(255);
    canvas = createCanvas(ancho, alto);
    canvas.parent('sketch_container');
    capture = createCapture('VIDEO');
    capture.hide();
    capture.elt.muted = true;
}

function draw(){
    translate(width, 0);
    //then scale it by -1 in the x-axis
    //to flip the image
    scale(-1, 1);
    image(capture, 0, 0, width, height);
}