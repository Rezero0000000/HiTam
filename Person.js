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
  }
}
