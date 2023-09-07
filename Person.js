class Person extends GameObject {
  constructor(config) {
    super(config);
    this.speed = 0.01; // Kecepatan pergerakan
    this.UP = false
    this.DOWN = false
    this.LEFT = false
    this.RIGHT = false
    this.vel_x = 0;
    this.vel_y = 0;
    this.acc_x = 0;
    this.acc_y = 0;
    this.acceleration = 1;
    this.friction = 0.1;
    this.isPlayerControlled = config.isPlayerControlled || false
  document.addEventListener('keydown', function(e){
        if(e.keyCode === 37){
        console.log("h")
            this.y += 1;
        }
        if(e.keyCode === 38){
            this.UP = true;
        }
        if(e.keyCode === 39){
            this.RIGHT = true;
        }
        if(e.keyCode === 40){
            this.DOWN = true;
        }
    });
    
    document.addEventListener('keyup', function(e){
        if(e.keyCode === 37){
            this.LEFT = false;
        }
        if(e.keyCode === 38){
            this.UP = false;
        }
        if(e.keyCode === 39){
            this.RIGHT = false;
        }
        if(e.keyCode === 40){
            this.DOWN = false;
        }
    });
  }


  update () {
    
    
    //if true, the accelertion component gets a certain value
    if(this.LEFT){
        console.log("hi")
        this.acc_x = -this.acceleration;
    }
    if(this.UP){
        this.acc_y = -this.acceleration;
    }
    if(this.RIGHT){
        this.acc_x = this.acceleration;
    }
    if(this.DOWN){
        this.acc_y = this.acceleration;
    }
    if(!this.UP && !this.DOWN){
        this.acc_y = 0;
    }
    if(!this.RIGHT && !this.LEFT){
        this.acc_x = 0;
    }

    //acceleration values added to the velocity components
    this.vel_x += this.acc_x;
    this.vel_y += this.acc_y;
    //velocity gets multiplied by a number between 0 and 1
    this.vel_x *= 1-this.friction;
    this.vel_y *= 1-this.friction;
    //velocity values added to the current x, y position
    this.x += this.vel_x;
    this.y += this.vel_y;

}

}
