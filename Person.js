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
let jumpHeight = 20; // Tinggi lompatan
let gravity = 1; // Gravitasi
let jumpForce = -20; // Kecepatan awal lompatan ke atas
let vely = 0;
let friction = 0.2;

class Person extends GameObject {
  constructor(config) {
    super(config);
    this.isPlayer = true; 
    this.initialY = this.y;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    };

    window.addEventListener('keydown', (e) => {
      if (e.key == 'a') {
        keys.a.pressed = true;
      }
      if (e.key == 'w') {
        isJumping = true;
      }
      if (e.key == 'd') {
        keys.d.pressed = true; // Perbaikan: Ganti keys.right dengan keys.d
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key == 'a') {
        keys.a.pressed = false;
      }
      if (e.key == 'w') {
        // Tidak perlu tindakan khusus saat tombol w dilepas
      }
      if (e.key == 'd') {
        keys.d.pressed = false; // Perbaikan: Ganti keys.right dengan keys.d
      }
    });
  }

  update() {
    vely += gravity;
    if (isJumping) {
      vely = jumpForce;
      isJumping = false;
    }
    if (this.y > utils.screenHeight - 38) {
      vely = 0;
      isJumping = false;
    }
    
    // Terapkan gesekan
    if (this.y >= utils.screenHeight - 38 && vely > 0) {
      vely -= friction;
      if (vely < 0) {
        vely = 0;
      }
    }

      this.y += this.velocity.y;
    if (keys.a.pressed || keys.d.pressed) {
      if (keys.a.pressed) {
        this.velocity.x = -2;
        direction = "left";
      }
      if (keys.d.pressed) {
        this.velocity.x = 2;
        direction = "right";
      }
      if (!keys.jump.pressed) {
        this.velocity.y = 0;
      }
      
      if (!keys.a.pressed && !keys.d.pressed) {
        this.velocity.x = 0;
      }
      
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      if (this.y < utils.screenHeight - 38) {
        // this.sprite.setAnimation(`walk-${direction}`);
      } 
    }
    else {
      if (this.y < utils.screenHeight - 38) {
        // this.sprite.setAnimation(`idle-${direction}`);
      }
    }
  }
}

// Definisikan utils.screenHeight dan GameObject sesuai kebutuhan Anda

// Contoh penggunaan:
// const player = new Person({/* konfigurasi */});
// gameObjects.push(player);


