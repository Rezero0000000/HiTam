class Overworld {
  constructor (config) {
    this.canvas = config.element;
    this.ctx = this.canvas.getContext("2d")
  }

  coreLoop () {
    const step = () => {

      this.ctx.drawImage(this.lowerMap, 0,0);
      this.hero.sprite.draw(this.ctx)
      this.hero.update()
      requestAnimationFrame(() => {
        step()
      })
    }
    step();
  }

  init () {
    this.lowerMap = new Image();
    this.lowerMap.src = "./images/maps/DemoLower.png"
    this.hero = new Person({
        x: 5, y: 6
    });
    this.coreLoop()
  }
}
