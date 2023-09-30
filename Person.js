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

let isJumping = false;
let jumpHeight = 10; // Tinggi lompatan
let gravity = 0.5; // Gravitasi
let jumpForce = -10; // Kecepatan awal lompatan ke atas

class Person extends GameObject{
  constructor(config) {
    super(config);
    this.isPlayer = true; 
    this.initialY = this.y;
    this.velocity = {
      x: 0,
      y: 0
    }

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
        this.velocity.y = jumpForce; // Mengatur kecepatan awal lompatan
        this.velocity.y -= gravity; // Meningkatkan kecepatan vertikal dengan gravitasi
        isJumping = true;
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

      // Memeriksa apakah karakter mencapai tinggi lompatan maksimum
      if (this.y <= this.initialY - jumpHeight) {
        this.velocity.y = 0; // Menghentikan pergerakan ke atas
      }
      if (this.y >= this.initialY) {
        this.velocity.y = 0; // Menghentikan pergerakan ke bawah
        isJumping = false; // Mengatur karakter kembali ke tanah
      }
      this.sprite.setAnimation(`walk-${direction}`);
    }
    else {
      this.sprite.setAnimation(`idle-${direction}`);
    }
  }
}
