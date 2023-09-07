class Sprite {
  constructor (config) {
    this.image = new Image()
    this.image.onload = () => {
      this.isImage = true;
    }


    this.image.src = config.src
    this.gameObject = config.gameObject    
  }

  draw (ctx) {
    const x = this.gameObject.x 
    const y = this.gameObject.y 

    this.isImage && ctx.drawImage (
      this.image, 0,0,32,32,x,y,32,32
    ) 
  } 

}
