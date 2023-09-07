 class DirectionInput {
  constructor() {
  }

  update (obj) {
document.addEventListener('keydown', function(e){
        if(e.code == "KeyD"){
            this.LEFT = true;
        }
        if(e.code == "KeyW"){
            this.UP = true;
        }
        if(e.code == "KeyA"){
            this.RIGHT = true;
        }
        if(e.code == "KeyS"){
            this.DOWN = true;
        }
    });
    
    document.addEventListener('keyup', function(e){
        if(e.code === "KeyD"){
            this.LEFT = false;
        }
        if(e.code === "KeyW"){
            this.UP = false;
        }
        if(e.code === "KeyA"){
            this.RIGHT = false;
        }
        if(e.code === "KeyS"){
            this.DOWN = false;
        }
    });

    //if true, the accelertion component gets a certain value
    if(this.LEFT){
        console.log("hi")
        obj.acc_x = -obj.acceleration;
    }
    if(this.UP){
        obj.acc_y = -obj.acceleration;
    }
    if(this.RIGHT){
        obj.acc_x = obj.acceleration;
    }
    if(this.DOWN){
        obj.acc_y = obj.acceleration;
    }
    if(!this.UP && !obj.DOWN){
        obj.acc_y = 0;
    }
    if(!obj.RIGHT && !obj.LEFT){
        obj.acc_x = 0;
    }

    //acceleration values added to the velocity components
    obj.vel_x += obj.acc_x;
    obj.vel_y += obj.acc_y;
    //velocity gets multiplied by a number between 0 and 1
    obj.vel_x *= 1-obj.friction;
    obj.vel_y *= 1-obj.friction;
    //velocity values added to the current x, y position
    obj.x += obj.vel_x;
   obj.y += obj.vel_y;

}

 }
