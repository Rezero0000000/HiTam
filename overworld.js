class Overworld {
  constructor (config) {
    this.canvas = config.element
    this.ctx = this.canvas.getContext("2d")
  }

  coreLoop () {
    const step = () => {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
      this.map.drawLowerImage(this.ctx)
      
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx);
      })
      
      this.map.drawUpperImage(this.ctx)
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init () {
    this.map = new OverworldMap(window.OverworldMaps.kitchen)
    this.coreLoop()
  }

}
