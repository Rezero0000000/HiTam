class Overworld {
  constructor (config) {
    this.canvas = config.element;
    this.ctx = this.canvas.getContext("2d")
  }

  coreLoop () {
    let previousMs;
    const stepTime = 1 / 40;
    const tick = (timestampMs) => {
      if (previousMs === undefined) {
          previousMs = timestampMs;
      }
      
      let delta = (timestampMs - previousMs) / 1000;
      const cameraPerson = this.map.gameObjects.hero
      
      while (delta >= stepTime) {
       
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.map.drawLowerMap(this.ctx, cameraPerson)
     
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.sprite.draw(this.ctx, cameraPerson);
        if (obj.isPlayer){
          obj.update()
        }
      })
        delta -= stepTime;
      }
    
      previousMs = timestampMs - delta * 1000; 
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); 
  }

  init () {
    this.map = new OverworldMap(window.OverworldMaps.Demo);
    this.coreLoop()
  }
}
