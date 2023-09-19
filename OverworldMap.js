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
    lowerSrc: "./map.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: 5, y: 6, frameWidth: 32, frameHeight: 32,
        src: "./player.png"
      }),
      npc1: new GameObject({
        x: 83, y: 80, frameWidth: 32, frameHeight: 32,
        src: "./images/characters/people/npc1.png"
      })
    }
  }
}
