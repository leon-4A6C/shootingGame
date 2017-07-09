class Game extends Engine {
  constructor(canvas) {
    super(canvas);
    this.camAngle = 0;
    this.players = [new Player, new Player];
    this.players[0].x, this.players[0].y = -250;
    this.players[1].x, this.players[1].y = -500;
    this.zombies = [new Zombie];
  }

  draw() {
    // clear the screen
    this._context.fillStyle = "#eee";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.save();

    // moves everything relative to the player
    this._context.translate(this._canvas.width/2,  this._canvas.height/2);
    this._context.rotate(this.camAngle / 180 * Math.PI); // rotate everything except the player

    this.players.forEach((player, index) => {
      if (index != 0) {
        this.drawSprite(player); // draw each player except the first one
      }
    });

    this.zombies.forEach(zombie => {
      this.drawSprite(zombie); // draw each zombie
    });

    this._context.restore();

    this._context.save();
    this._context.translate(this._canvas.width/2,  this._canvas.height/2);
    this.drawPlayer(this.players[0]);
    this._context.rotate(this.camAngle / 180 * Math.PI); // rotate everything except the player
    this._context.restore();

  }

  drawPlayer(player) {
    this._context.save();
    this._context.rotate((this.camAngle - player.rotation) / 180 * Math.PI);
    this._context.drawImage(player.img, 0 - this.players[0].size.x/2, 0 - this.players[0].size.y/2, player.size.x, player.size.y); // draws from the center
    this._context.restore();
  }

  drawSprite(sprite) {
    this._context.save();
    this._context.translate(sprite.pos.x - this.players[0].pos.x, sprite.pos.y - this.players[0].pos.y);
    this._context.rotate(sprite.rotation / 180 * Math.PI);
    // guide line to see where the sprite is "looking"
    // this._context.beginPath();
    // this._context.moveTo(0,0);
    // this._context.lineTo(0,-300);
    // this._context.stroke();
    // this._context.closePath();
    this._context.drawImage(sprite.img, 0 - sprite.size.x/2, 0 - sprite.size.y/2, sprite.size.x, sprite.size.y); // draws from the center
    this._context.restore();
  }

  simulate(dt) {
    this.camAngle += (this.players[0].rotation - this.camAngle) * 15 * dt; // adds an smooth rotation

    this.zombies.forEach(zombie => {
      // get the distances
      const len = this.players.map((player) => {
        return zombie.pos.distance(player.pos);
      }).map((dist) => {
        return dist.len;
      });

      // get the closest player from the array
      let closest = 0;
      for (var i = 0; i < len.length; i++) {
        if (len[i] < len[closest]) {
          closest = i;
        }
      }
      // rotate to the closest person
      zombie.lookAt(this.players[closest], 1 * dt);
      // move towards the player
      zombie.forwards(100 * dt);
    });

    // do stuff with the input
    if (this.inputHandler.down.indexOf("down") != -1) {
      this.players[0].backwards(150 * dt);
    }
    if (this.inputHandler.down.indexOf("up") != -1) {
      this.players[0].forwards(150 * dt);
    }
    if (this.inputHandler.down.indexOf("left") != -1) {
      this.players[0].rotation += 180 * dt;
    }
    if (this.inputHandler.down.indexOf("right") != -1) {
      this.players[0].rotation -= 180 * dt;
    }
  }

}

const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight - 5;
const game = new Game(canvas);
