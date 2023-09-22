class Sprite {
  constructor (config) {
    this.gameObject = config.gameObject;

    this.image = new Image();
    this.image.onload = (() => {
      this.isImage = true;
    })
    console.log(this.gameObject.animations)

    this.image.src = config.src;
    this.animations = this.gameObject.animations;
    this.currentAnimation = "idle-left";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = 5;
    this.animationFrameProgress = this.animationFrameLimit;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress () {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  draw (ctx, cameraPerson) {
    const x = this.gameObject.x + 10 - cameraPerson.x;
    const y = this.gameObject.y + 6- cameraPerson.y;
    const frameWidth = this.gameObject.frameWidth;
    const frameHeight = this.gameObject.frameHeight;

    if (this.animations) {

    const [frameX, frameY] = this.frame;
    
      this.isImage && ctx.drawImage(this.image, 
        frameX * 32, frameY * 32,
        frameWidth, frameHeight,
        x, y,
        frameWidth, frameHeight
      )

    this.updateAnimationProgress()
    }
    else {
    this.isImage && ctx.drawImage(this.image, 
        0, 0,
        frameWidth, frameHeight,
        x, y,
        frameWidth, frameHeight
      )
    }
  }
}
