class Overworld {
 constructor(config) {
   this.canvas = config.element
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx);

      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
        })
        object.sprite.draw(this.ctx);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx);
      
      requestAnimationFrame(() => {
        step();   
      })
    }
    step();
 }

 init() {
  this.map = new OverworldMap(window.OverworldMaps.kitchen);

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();
 }
}
