// import AutoPause from '/rostros/public/plugins/AutoPause';
// import AutoPlay from '/rostros/public/plugins/AutoPlay';
// import MediaPlayer from '/rostros/public/MediaPlayer';

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
        console.log("Creando el autoplay");
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
// const buttonPlay =  document.querySelector("#buttonPlay");
const player = new MediaPlayer({ el: video, plugins: [
    new AutoPlay(),
    new AutoPause(),
] });
// console.log(player)
// buttonPlay.onclick = () => player.togglePlay();

