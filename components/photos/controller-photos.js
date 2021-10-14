const store = require('./store-photos');
const request = require('request-promise-native');
const Photo = require('./model-photos');
const fs = require("fs");

// Descomentar para ejecucion en local
const { FACE_DETECTION, FACE_EMOTIONS, FACE_TOKEN } = require('../../config');

// Descomentar para ejecucion en heroku
// const FACE_DETECTION = process.env.FACE_DETECTION;
// const FACE_EMOTIONS = process.env.FACE_EMOTIONS;
// const FACE_TOKEN = process.env.FACE_TOKEN

const makeRequest = async (method, url, datos, files = {}) => {
    let data = JSON.parse(JSON.stringify(datos))
    for (let i of Object.keys(files)) data[i] = fs.createReadStream(files[i]);
    
    let options = {
        method: method,
        url: url,
        headers: {
            'token': FACE_TOKEN
        },
        formData: data
    }
      
    const response = await request(options)
            .catch(e => console.log('Hubo un error al analizar la foto: ', e));
    return response;
};

const addPhoto = (reqBody) => {
    return new Promise(async (resolve, reject) => {    
        try{
            let analysis = await makeRequest("POST", FACE_DETECTION, {"photo": reqBody.snap}, {})
                                    .then(response => {
                                        if(!response) {
                                            reject("[makeRequest] No se detecto rostro en la foto");
                                            return false;
                                        } else {
                                            return response;
                                        }
                                    })
                                    .catch(e => console.error(e));
            analysis = JSON.parse(analysis);

            // Revisa si hay la informacion del analisis de rostro
            if(analysis.length == 0) {
                console.error("[photoController] No se detecto ningun rostro");
                reject("No hay rostro en la foto");
                return false;
            }
            
            let emotions = await makeRequest("POST", FACE_EMOTIONS, {"photo": reqBody.snap}, {})
                                    .then(response => {
                                        if(!response) {
                                            reject("[makeRequest] No se detectaron emociones en la foto");
                                            return false;
                                        } else {
                                            return response;
                                        }
                                    })
                                    .catch(e => console.error(e));
            if(!emotions) {
                console.error("[makeRequest] No se detectaron emociones");
                reject("No hay rostro en la foto");
                return false;
            }
            emotions = JSON.parse(emotions);
            // Revisa si la peticion para la deteccion de emociones es exitosa
            if(emotions.status === 'failure') {
                console.error("[photoController] No se detectaron emociones en el rostro");
                reject("No se detectaron emociones en el rostro, intentalo de nuevo");
                return false;
            }

            let emotionToDB;

            if(!emotions.faces[0]) {
                emotions.faces[0] = {
                    rectangle: {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    },
                    emotions: {
                        cubrebocas: 1,
                    }
                }
                emotionToDB = ["cubrebocas", "1"];
            } else {
                let emociones = Object.entries(emotions.faces[0].emotions);
                // console.log(emociones);
                let valores = Object.values(emotions.faces[0].emotions);
                let maxVal = Math.max(...valores);
                emociones.forEach(value => {
                    if(value[1] === maxVal){
                        emotionToDB = value;
                    }
                })
            }
            
            const newPhoto = new Photo({
                lat: reqBody.lat,
                lon: reqBody.lon,
                image: reqBody.snap,
                age: analysis[0].age,
                gender: analysis[0].gender.value,
                genProb: analysis[0].gender.probability,
                emotion: emotionToDB[0],
                emotionProb: emotionToDB[1],
                place: 'APP',
            })  
            store.add(newPhoto);
            resolve(newPhoto);

        } catch(error) {
            console.error(error);
        }
    })
}

const getPhoto = () => {}

const listPhotos = () => {
    console.log("Listando fotos");
    return new Promise((resolve, reject ) => {
        resolve(store.list());
      });
}

module.exports = {
    addPhoto,
    getPhoto,
    listPhotos,
  }