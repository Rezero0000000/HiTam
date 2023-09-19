class Sprite {
  constructor (config) {
    this.gameObject = config.gameObject;

    this.image = new Image();
    this.image.onload = (() => {
      this.isImage = true;
    })
    this.image.src = config.src;

    this.playAnimate = false;
    this.animations = config.animations || {};
    
    this.currentAnimation = config.currentAnimation || "";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
 
  }

  get frame () {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.playAnimate = true;
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
    else {
      this.playAnimate = false;
    }
  }
  
  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  draw (ctx) {
    const x = this.gameObject.x;
    const y = this.gameObject.y;

    const frameWidth = this.gameObject.frameWidth;
    const frameHeight = this.gameObject.frameHeight;

    if (this.playAnimate) {
      const [frameX, frameY] = this.frame;
      
      this.isImage && ctx.drawImage(this.image, 
        frameX * frameWidth, frameY * frameHeight,
        frameWidth, frameHeight,
        x, y,
        frameWidth, frameHeight
      )

      this.updateAnimationProgress();
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
