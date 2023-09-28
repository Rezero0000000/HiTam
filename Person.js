const keys = {
  jump: {
    pressed: false
  },
  a: {
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
      keys.jump.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break

    case 'd':
      keys.d.pressed = true
      break
    }
  });

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
    case 'w':
      keys.jump.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break   

    case 'd':
      keys.d.pressed = false
      break
    }
  });
}

  update () {
     if (keys.jump.pressed || keys.a.pressed || keys.d.pressed) {
      if (keys.jump.pressed) {
        this.velocityY = -3 *2;
      } 

      if(keys.a.pressed){
        this.velocityX = 2;
        direction = "left"
      }
      if(keys.d.pressed){
        this.velocityX = -2;
        direction = "right"
      }
      if (!keys.jump.pressed) {
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
      if (this.y < utils.screenHeight - 38) {
        this.y += 2;
      }
      this.sprite.setAnimation(`idle-${direction}`);
    }
  }
}
