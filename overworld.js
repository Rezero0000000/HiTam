class Overworld {
  constructor (config) {
    this.canvas = config.element;
    this.ctx = this.canvas.getContext("2d")
  }

  init () {
    const lowerMap = new Image();
    lowerMap.src = "./images/maps/DemoLower.png"
    lowerMap.onload = (() => {
      this.ctx.drawImage(lowerMap, 0,0);
    })
    
  }
}
