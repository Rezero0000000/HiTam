class GameObject {
  constructor (config) {
    this.x = config.x
    this.y = config.y
    this.directionInput = config.directionInput || false
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/hero.png"
    })
  }
  update () {

  }
}
