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
        src: "./player.png",
        animations: {
      "idle-right": [[0, 2], [1,2], [2,2], [3,2]],
      "walk-right": [[0,0], [1,0], [2,0], [3,0]], 
      "idle-left": [[0, 3], [1,3], [2,3], [3,3]],
      "walk-left": [[0,1], [1,1], [2,1], [3,1]],
    }
      }),
      npc1: new GameObject({ x: 20, y: 20, frameWidth: 32, frameHeight: 32})
    }
  }
}
