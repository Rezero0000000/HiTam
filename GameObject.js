const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

class GameObject {
  constructor (config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
      gameObject: this,
      src: "./images/characters/people/hero.png"
    })
    this.vel_x = 0;
    this.vel_y = 0;
    this.acc_x = 0;
    this.acc_y = 0;
    this.acceleration = 1;
    this.friction = 0.1;
    this.UP = false;
    this.DOWN = false;
    this.LEFT = false;
    this.RIGHT = false;


window.addEventListener('keydown', (e) => {
       switch (e.key) {
    case 'w':
      keys.w.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break

    case 's':
      keys.s.pressed = true
      break

    case 'd':
      keys.d.pressed = true
      break
  }
    })

 window.addEventListener('keyup', (e) => {
       switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break

    case 's':
      keys.s.pressed = false
      break

    case 'd':
      keys.d.pressed = false
      break
  }
    })
  }

  update () {
    
    if (keys.w.pressed){
      this.y -= 1;
    }
    if (keys.s.pressed) {
      this.y += 1;
    }
    if (keys.a.pressed) {
      this.x -= 1;
    }
    if (keys.d.pressed) {
      this.x += 1;
    }
  }
} 
