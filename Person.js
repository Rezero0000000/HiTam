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
let direction = "right";

class Person extends GameObject{
  constructor(config) {
    super(config);
    this.isPlayer = true;

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
     if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
    switch (true) {
      case keys.w.pressed:
        this.y -= 1;
        break;
      case keys.s.pressed:
        this.y += 1;
        break;
      case keys.a.pressed:
        direction = "left"
        this.x -= 1;
        break;
      case keys.d.pressed:
        direction = "right"
        this.x += 1;
        break;
      default:
        break;
    }
    this.sprite.setAnimation(`walk-${direction}`)
  }
    else {
      this.sprite.setAnimation(`idle-${direction}`)
    }
  }
}
