class OverworldMap {
  constructor (config) {
    this.gameObjects = config.gameObjects

    this.lowerMap = new Image();
    this.lowerMap.src = config.lowerSrc;
    this.xMap = 0;
  }

  drawLowerMap (ctx, cameraPerson) {
    
    if (cameraPerson.x >= 210) {
      this.xMap -= 1 
      console.log("Hh")
    }
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
        x: 100, y: utils.screenHeight - 100, frameWidth: 16, frameHeight: 16,
        src: "./images/Shadow.png",
        animations: {
          "idle-left": [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0]]
        }
      }),
    }
  }
}
