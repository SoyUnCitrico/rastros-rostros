// console.log("Estamos en los datos")
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
      // console.log("Creando el autoplay");
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


const video =  document.querySelector("video");
const player = new MediaPlayer({ el: video, plugins: [
  new AutoPlay(),
  new AutoPause(),
] });

let displayInfo = document.querySelector(".displayInfo");
let params = (new URL(window.location.href)).searchParams;
for(var pair of params.entries()) {
  let p = document.createElement("p");
  p.innerHTML = `${pair[0].toString().toUpperCase()}: ${pair[1]}`;
  displayInfo.append(p);    
}


