class OverworldMap {
  constructor (config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;


    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc
  }

  drawLowerImage (ctx) {
    ctx.drawImage(this.lowerImage, 0,0)
  }

  drawUpperImage (ctx) {
    ctx.drawImage(this.upperImage, 0,0)
  }
}

window.OverworldMaps = {
  kitchen: {
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: 5, y:6
      })
    }
  }
}
