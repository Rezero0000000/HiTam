class OverworldMap {
  constructor (config) {
    this.gameObjects = config.gameObjects

    this.lowerMap = new Image();
    this.lowerMap.src = config.lowerSrc;
    this.xMap = 0;
  }

  drawLowerMap (ctx, cameraPerson) {
    ctx.drawImage (  
      this.lowerMap,
      this.xMap,
      0
    );
  }
}

window.OverworldMaps = {
  Demo: {
    lowerSrc: "./prototype.png",
    gameObjects: {
      hero: new Person({
        x: 100, y: utils.screenHeight - 38, frameWidth: 16, frameHeight: 16,
        src: "./images/Shadow.png",
        animations: {
          "idle-right": [[0,0], [2,0], [3,0], [1,0]],
          "walk-right": [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1]],
          "idle-left": [[7,2], [5,2], [4,2], [6,2]],
          "walk-left": [[7,3], [6,3], [5,3], [4,3], [3,3], [2,3], [1,3], [0,3]]
        }
      }),
    }
  }
}
