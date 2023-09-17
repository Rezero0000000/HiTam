class Overworld {
  constructor (config) {
    this.canvas = config.element;
    this.ctx = this.canvas.getContext("2d")
  }

  coreLoop () {
    const step = () => {
      this.map.drawLowerMap(this.ctx)
      
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.sprite.draw(this.ctx);
      })

      this.map.drawUpperMap(this.ctx);
      requestAnimationFrame(() => {
        step()
      })
    }
    step();
  }

  init () {
    this.map = new OverworldMap(window.OverworldMaps.Demo);
    this.coreLoop()
  }
}
