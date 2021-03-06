class Entity extends Sprite {
  constructor(img, health = 20, x, y, w, h, sx, sy, sw, sh, middleX, middleY) {
    super(img, x, y, w, h, sx, sy, sw, sh, middleX, middleY);
    this.maxHealth = health;
    this.health = this.maxHealth;
    this.dmg = 5;
    this.attachments = []; // you can put stuff like arms in here. the x, y pos will be relative to the entity
  }
  lookAt(entity, speed) {
    const dist = this.pos.distance(entity.pos);
    const targetRotation = (Math.atan2(dist.y, dist.x) * 180 / Math.PI - 90);
    if (dist.x < 5 && dist.y < 5) {
      speed = 1; // sort of fixes weird movement
    }
    this.rotation += (targetRotation - this.rotation) * speed;
  }
  get healthPercentage() {
    return this.health / this.maxHealth * 100;
  }
}
