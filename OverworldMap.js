class OverworldMap {
  constructor (config) {
    this.gameObjects = config.gameObjects

    this.lowerMap = new Image();
    this.lowerMap.src = config.lowerSrc;

    this.upperMap = new Image();
    this.upperMap.src = config.upperSrc;

  }

  drawLowerMap (ctx, cameraPerson) {
    ctx.drawImage (
      this.lowerMap,
      0,0
      //cameraPerson.x, 
      //cameraPerson.y
    );
  }

  drawUpperMap (ctx) {
    ctx.drawImage (this.upperMap, 0, 0);
  }
}

window.OverworldMaps = {
  Demo: {
    lowerSrc: "./prototype.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: 5, y: 6, frameWidth: 16, frameHeight: 16,
        src: "./images/Shadow.png"
      }),
    }
  }
}
