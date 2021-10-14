class MediaPlayer {
  constructor(config) {
      this.media = config.el;
      this.plugins = config.plugins || [];
      this._initPlugins();
  }

  _initPlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this);
    });
  }

  pause() {
    this.media.pause();
  }
  play() {
    this.media.play();
  }
  togglePlay() {
    if(this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

  toggleMute() {
       this.media.muted = !this.media.muted;
       console.log("MUTE: " + this.media.muted);
    }
};


class AutoPlay {
  constructor(){
  }

  run(player) {
    if(!player.media.muted) {
      player.media.muted = true;
    }
    player.play();
    console.log("Auto Playing");
  }
}

class AutoPause {
  constructor() {  
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    });
    observer.observe(player.media);
    document.addEventListener("visibilitychange", this.handleVisibilityChange)
  }
  
  handleIntersection (entries) {
    const entry = entries[0];
    
    const isVisible = entry.intersectionRatio >= this.threshold;

    if(isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
    // console.log(entry);
  }

  handleVisibilityChange () {
    const isVisible = document.visibilityState === "visible";
    if(isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
  
}

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

const video =  document.querySelector("video");
// const player = new MediaPlayer({ el: video, plugins: [
//   new AutoPlay(),
//   new AutoPause(),
// ] });

let displayInfo = document.querySelector(".displayInfo");
let params = (new URL(window.location.href)).searchParams;

if(Array.from(params).length > 0) {
  let title = document.createElement("h4")
  title.className= "infoTitle";
  title.innerHTML = 'Los datos que se obtuvieron de tu foto son: '
  displayInfo.append(title);

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
      default:
        p = document.createElement("p")
        console.log("No pude identificar este parametro: ", pair[0])
        break;
    }

    
    // if(pair[0] === "emocion") {
    //   p = document.createElement("span")
    //   p.className ="infoParrafo";
    //   p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${translateEmotion(pair[1])}`;
    //   // p.style.display = "inline";
    // } else if(pair[0] === "probEmo") {
    //   p = document.createElement("span")
    //   p.className ="probParrafo";
    //   p.innerHTML = `, con una probabilidad del: ${(pair[1] * 100)}% <br>`;
    // } else if(pair[0] === "genero") {
    //   p = document.createElement("span")
    //   p.className ="infoParrafo";
    //   p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${translateGender(pair[1])}`;
    // } else if (pair[0] === "probGen") {
    //   p = document.createElement("span")
    //   p.className ="probParrafo";
    //   p.innerHTML = `, con una probabilidad del: ${(pair[1] * 100)}% <br>`;
      
    // } else{
    //   p = document.createElement("p")
    //   p.className ="infoParrafo";
    //   p.innerHTML = `${capitalizeFirstLetter(pair[0].toString())}: ${pair[1]}`;
    // }
    
    displayInfo.append(p);    
  }
}



