const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const translateEmotion = (string) => {
  let traduccion = "";
  switch(string) {
    case "happiness":
      traduccion = "Felicidad";
      break;
    case "neutral":
      traduccion = "Neutral";
      break;
    case "anger":
      traduccion = "Enfado";
      break;
    case "disgust":
      traduccion = "Asco";
      break;
    case "sadness":
      traduccion = "Tristeza";
      break;
    case "contempt":
      traduccion = "Desprecio";
      break;
    case "smile":
      traduccion = "Sonrisa";
      break;
    case "surprise":
      traduccion = "Sorpresa";
      break;
    case "fear":
      traduccion = "Temor";
      break;
    default:
      traduccion = string;
      break;
  }
  return traduccion;
}

const translateGender = (string) => {
  let traduccion = "";
  switch(string) {
    case "Male":
      traduccion = "Masculino";
      break;
    case "Female":
      traduccion = "Femenino";
      break;
    default:
      traduccion = string;
      break;
  }
  return traduccion;
}

let videoContenedor = document.querySelector("#videoTwitch");
console.log(videoContenedor);
let anchoVideo = videoContenedor.offsetWidth;

if(anchoVideo > 800) { 
  anchoVideo = 800;
}

let altoVideo = anchoVideo * 3 / 4;

let options = {
  width: anchoVideo,
  height: altoVideo,
  channel: "lacolmenatlx",
  parent: ["rastros-rostros.herokuapp.com"]
};
let reproductor = new Twitch.Player("videoTwitch", options);
reproductor.setVolume(0.3);


let displayInfo = document.querySelector(".displayInfo");
let params = (new URL(window.location.href)).searchParams;

if(Array.from(params).length > 0) {
  let title = document.createElement("h3")
  title.className= "infoTitle";
  title.innerHTML = `Gracias por participar, tu foto sera proyectada despues de las 10:30pm.`
  displayInfo.append(title);
  
  let subtitle = document.createElement("h4")
  subtitle.className= "infoTitle";
  subtitle.innerHTML = `Los datos que se obtuvieron de tu foto son: `
  displayInfo.append(subtitle);

  for(var pair of params.entries()) {
    let p;

    switch(pair[0]){
      case "edad":
        p = document.createElement("p")
        p.className ="infoParrafo";
        p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${pair[1]}`;
        break;
      case "emocion":
        p = document.createElement("span")
        p.className ="infoParrafo";
        p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${translateEmotion(pair[1])}`;
        break;
      case "probEmo":
        p = document.createElement("span")
        p.className ="probParrafo";
        p.innerHTML = `, con una probabilidad del: ${(pair[1] * 100)}% <br>`;
        break;
      case "genero":
        p = document.createElement("span")
        p.className ="infoParrafo";
        p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${translateGender(pair[1])}`;
        break;
      case "probGen":
        p = document.createElement("span")
        p.className ="probParrafo";
        p.innerHTML = `, con una probabilidad del: ${(pair[1] * 100)}% <br>`; 
        break;
      case "index":
        p = document.createElement("p")
        p.className ="infoParrafo";
        p.innerHTML = `Eres el participante numero: ${(pair[1])} <br>`; 
        break;
      default:
        p = document.createElement("p")
        console.log("No pude identificar este parametro: ", pair[0])
        break;
    }
    displayInfo.append(p);    
  }
}
