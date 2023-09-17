class Sprite {
  constructor (config) {
    this.gameObject = config.gameObject;

    this.image = new Image();
    this.image.onload = (() => {
      this.isImage = true;
    })
    this.image.src = config.src;
  }

  draw (ctx) {
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    const frameWidth = this.gameObject.frameWidth;
    const frameHeight = this.gameObject.frameHeight;

    this.isImage && ctx.drawImage(this.image, 
      0, 0,
      frameWidth, frameHeight,
      x, y,
      frameWidth, frameHeight
    )
  }
}
