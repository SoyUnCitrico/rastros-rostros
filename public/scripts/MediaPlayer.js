export default class MediaPlayer {
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

    // Funcion con JS
    // _initPlugins() {
    //   const player = {
    //     play: () => this.play(),
    //     pause: () => this.pause(),
    //     media: this.media,
    //     get muted() {
    //       return this.media.muted;
    //     },
    //     set muted(value) {
    //       this.media.muted = value;
    //     }
    //   }
    //   this.plugins.forEach(plugin => {
    //       plugin.run(player);
    //   });
    // }
    
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
  