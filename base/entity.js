class Entity extends Sprite {
  constructor(img, health = 20) {
    super(img);
    this.health = health;

    // scale it a bit
    this.img.addEventListener("load", () => {
      this.size.x *= 3;
      this.size.y *= 3;
    });
  }
  lookAt(entity, speed) {
    const dist = this.pos.distance(entity.pos);
    const targetRotation = (Math.atan2(dist.y, dist.x) * 180 / Math.PI - 90);
    this.rotation += (targetRotation - this.rotation) * speed;
  }
}
