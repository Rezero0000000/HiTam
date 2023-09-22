class Overworld {
  constructor (config) {
    this.canvas = config.element;
    this.ctx = this.canvas.getContext("2d")
  }

  coreLoop () {
  /*  const step = () => {
      this.map.drawLowerMap(this.ctx)
      
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.sprite.draw(this.ctx);
        if (obj.isPlayer){
          obj.update()
        }
      })

      requestAnimationFrame(() => {
        step()
      })
    }
    step();
*/

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
    previousMs = timestampMs - delta * 1000; // Make sure we don't lose unprocessed (delta) time

    //Recapture the callback to be able to shut it off
    requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); //kick off the first step!
  }

  init () {
    this.map = new OverworldMap(window.OverworldMaps.Demo);
    this.coreLoop()
  }
}
