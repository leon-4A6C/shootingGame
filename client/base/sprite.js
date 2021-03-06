class Sprite extends Rect {
  constructor(img, x, y, w, h, sx = 0, sy = 0, sw, sh, middleX = 0, middleY = 0) {
    super(x, y, w, h);
    this.middle = new Vec(middleX, middleY); // TODO: render it differently with this, use as offset in drawing
    this.spritePos = new Vec(sx, sy);
    this.spriteSize = new Vec(sw, sh)
    const setSize = () => {
      this.img.width = this.size.x = this.spriteSize.x = this.size.x || this.spriteSize.x || this.img.naturalWidth;
      this.img.height = this.size.y = this.spriteSize.y = this.size.y || this.spriteSize.y || this.img.naturalHeight;
      this.size.x *= 3; // scale them up, because they are small
      this.size.y *= 3; // scale them up, because they are small
    }
    if (img instanceof Image) {
      this.img = img;
      setSize();
    } else {
      this.img = document.createElement("img");
      this.img.src = img;
      this.img.width = this.size.x;
      this.img.height = this.size.y;
      this.img.addEventListener("load", () => {
        setSize();
      });
    }
  }
}
