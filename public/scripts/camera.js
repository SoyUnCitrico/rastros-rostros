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
console.log(ancho, alto);

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

console.log(ancho, alto);

boton.addEventListener('click', async () => {
    capture.loadPixels();
    let snap = capture.canvas.toDataURL('image/png', 1.0);
    let data = {lat, lon, snap};
    let message = JSON.stringify(data);  
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body:  message,
        };
    
    await fetch('/photo/', options)
        .then(async (response) => {    
            if (response.ok) {
                // Para recargar la pagina
                // window.location.reload();
                // Para mandar hacia otra pagina los datos del analisis
                let respuesta = await response.json();
                let edad = (Math.round(respuesta.body.age).toString());
                let emo = (respuesta.body.emotion);
                let genero = (respuesta.body.gender);
                window.location.assign(`./dataApp.html?edad=${edad}&emocion=${emo}&genero=${genero}`)
            } else if(response === undefined){
                if(!alert('Algo ocurrio al tomar la foto, intentalo de nuevo')){window.location.reload();}
            }   else {
                if(!alert('Algo ocurrio al tomar la foto, intentalo de nuevo')){window.location.reload();}
                throw new Error('Algo ocurrio al tomar la foto, intentalo de nuevo');  
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
    if('geolocation' in navigator){
        console.log("Geo available");
        navigator.geolocation.getCurrentPosition(position=>{
                lat = position.coords.latitude.toString();
                lon =  position.coords.longitude.toString();
        });
    } else  {
        //que pasa si no se detecta ubicacion
        lat = 0;
        lon = 0;
    }
}

function draw(){
    image(capture, 0, 0, width, height);
}