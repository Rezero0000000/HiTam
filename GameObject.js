

class GameObject {
  constructor (config) {
    this.isPlayer = false
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
      gameObject: this,
      src: "./images/characters/people/hero.png"
    })
  }

  update () {
  }
} 
