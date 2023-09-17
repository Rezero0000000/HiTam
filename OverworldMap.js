class OverworldMap {
  constructor (config) {
    this.gameObjects = config.gameObjects

    this.lowerMap = new Image();
    this.lowerMap.src = config.lowerSrc;

    this.upperMap = new Image();
    this.upperMap.src = config.upperSrc;

  }

  drawLowerMap (ctx) {
    ctx.drawImage (this.lowerMap, 0, 0);
  }

  drawUpperMap (ctx) {
    ctx.drawImage (this.upperMap, 0, 0);
  }
}

window.OverworldMaps = {
  Demo: {
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: 5, y: 6, frameWidth: 32, frameHeight: 32
      })
    }
  }
}
