class GameObject {
  constructor (config) {
    this.x = 0;
    this.y = 0;
    this.sprite = new Sprite({
      gameObject: this,
      src: "./images/characters/people/hero.png"
    })
  }
} 
