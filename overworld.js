class Overworld {
  constructor (config) {
    this.canvas = config.element
    this.ctx = this.canvas.getContext("2d")
  }

  init () {

    console.log("")
    const map = new Image()
    map.onload = () => {
      this.ctx.drawImage (
        map,0,0
      )  
    }
    map.src = "./images/maps/KitchenLower.png"

    const hero = new GameObject(5,6)

    setTimeout(function () {
      hero.draw(this.ctx)        
    }, 200)
  }
}
