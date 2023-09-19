class GameObject {
  constructor (config) {
    this.isPlayer = false

    this.x = config.x || 0;
    this.y = config.y || 0;
    this.frameWidth = config.frameWidth;
    this.frameHeight = config.frameHeight;

    this.currentAnimation = "idle";
    this.animations = {
      "idle": [[0, 2], [1,2], [2,2], [3,2]]
    }

    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/hero.png"
    })
  }

  update () {
  }
} 
