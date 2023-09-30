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
    this.velocity = {
      x: 0,
      y: 0
    }

  window.addEventListener('keydown', (e) => {
    switch (e.key) {

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

    case 'a':
      keys.a.pressed = false
      break   

    case 'd':
      keys.d.pressed = false
      break
    }
  });

  window.addEventListener("keypress", (e) => {
    switch (e.key) {
    case 'w':
      keys.jump.pressed = true
      break
    }
  })
}

  update () {
     if (keys.jump.pressed || keys.a.pressed || keys.d.pressed) {
      if (keys.jump.pressed) {
        this.velocity.y = -3 *2;
        keys.jump.pressed = false;
      } 

      if(keys.a.pressed){
        this.velocity.x = -2;
        direction = "left"
      }
      if(keys.d.pressed){
        this.velocity.x = 2;
        direction = "right"
      }
      if (!keys.jump.pressed) {
        this.velocity.y = 0;
      }
      
      if(!keys.a.pressed && !keys.d.pressed) {
        this.velocity.x = 0;
      }
      
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      this.sprite.setAnimation(`walk-${direction}`);
    }
    else {
      if (this.y < utils.screenHeight - 38) {
        this.velocity.y = 4;
        this.velocity.y += 0.001;
      } else {
        this.velocity.y = 0
      }
      this.y += this.velocity.y

      this.sprite.setAnimation(`idle-${direction}`);
    }

  }
}
