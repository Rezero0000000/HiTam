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
    this.velocityX = 0;
    this.velocityY = 0;

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
  });

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
  });
}

  update () {
     if (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
    
      if(keys.w.pressed){
        this.velocityY = 1;
      }
      if(keys.s.pressed){
        this.velocityY = -1;
      }
      if(keys.a.pressed){
        this.velocityX = 1;
        direction = "left"
      }
      if(keys.d.pressed){
        this.velocityX = -1;
        direction = "right"
      }
      if(!keys.w.pressed && !keys.s.pressed) {
        this.velocityY = 0;
      }
      if(!keys.a.pressed && !keys.d.pressed) {
        this.velocityX = 0;
      }
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.sprite.setAnimation(`walk-${direction}`);
    }
    else {
      this.sprite.setAnimation(`idle-${direction}`);
    }
  }
}
