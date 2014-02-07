asteroids.Game = function (ctx) {
  this.ctx = ctx;
  this.asteroids = [];
  this.bullets = [];
  this.ship = new asteroids.Ship();
  this.gameover = false;

  // generate asteroids
  for (var i = 0; i < 10; i++) {
    this.asteroids.push(this.randomAsteroid());
  }
}

asteroids.Game.prototype.shipIsHit = function() {
  var ship_pos = [this.ship.x, this.ship.y];
  for (var i = 0, n = this.asteroids.length; i < n; i++) {
    var asteroid = this.asteroids[i],
        asteroid_pos = [asteroid.x, asteroid.y],
        dx = ship_pos[0] - asteroid_pos[0],
        dy = ship_pos[1] - asteroid_pos[1];

    if (Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5) < (asteroid.radius + this.ship.radius)) {
      this.gameover = true;
      return true;
    }
  }
  return false;
};

asteroids.Game.prototype.asteroidIsHit = function(asteroid) {
  for (var i = 0; i < this.bullets.length; i++) {
    var bullet = this.bullets[i],
        bullet_x = bullet.x,
        bullet_y = bullet.y,
        dx = asteroid.x - bullet_x,
        dy = asteroid.y - bullet_y;

    if (Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5) < (asteroid.radius + bullet.radius)) {
      this.bullets.splice(i, 1);
      // console.log("Asteroid obliterated!");
      return true;
    }
  }
  return false;
}

asteroids.Game.prototype.randomAsteroid = function () {
  var x = this.generateCoord(),
      y = this.generateCoord();

  return new asteroids.Asteroid(x, y);
};

asteroids.Game.prototype.generateCoord = function() {
  var coord = Math.random() * 600 - 50;

  while (coord > -25 && coord < 525) {
    coord = Math.random() * 600 - 50;
  }
  return coord;
}

asteroids.Game.prototype.wrapShip = function() {
  var x = this.ship.x,
      y = this.ship.y;

  if (x < 0) {
    this.ship.x = 500;
  }
  if (x > 500) {
    this.ship.x = 0;
  }
  if (y < 0) {
    this.ship.y = 500;
  }
  if (y > 500) {
    this.ship.y = 0;
  }
}

asteroids.Game.prototype.update = function () {
  // update ship
  this.wrapShip();
  this.ship.update();

  for (var i = 0; i < this.asteroids.length; i++) {
    var asteroid = this.asteroids[i];
    asteroid.update();
    if (asteroid.x > 550 || asteroid.x < -50 || asteroid.y < -50 || asteroid.y > 550) {
      this.asteroids[i] = this.randomAsteroid();
    }
    if (this.asteroidIsHit(asteroid)) {
      // console.log("Asteroid hit");
      if (asteroid.radius >= 19) {
        var asteroid1 = new asteroids.Asteroid(asteroid.x, asteroid.y),
            asteroid2 = new asteroids.Asteroid(asteroid.x, asteroid.y);

        asteroid1.radius = asteroid.radius - 10;
        asteroid2.radius = asteroid.radius - 10;

        this.asteroids.push(asteroid1);
        this.asteroids.push(asteroid2);
      }
      this.asteroids.splice(i, 1);
    }
  }

  // update bullets
  for (var j = 0; j < this.bullets.length; j++) {
    var bullet = this.bullets[j];
    if (bullet.x > 550 || bullet.x < -50 || bullet.y < -50 || bullet.y > 550) {
      this.bullets.splice(j, 1);
    }
    bullet.update();
  }
};

asteroids.Game.prototype.draw = function () {
  this.ctx.clearRect(0, 0, 500, 500);

  if (this.gameover) {
    this.ctx.fillStyle = '#f00';
    this.ctx.fillRect(0, 0, 500, 500);
  }

  for (var i = 0, n = this.asteroids.length; i < n; i++) {
    this.asteroids[i].draw(this.ctx);
  }

  for (var j = 0, m = this.bullets.length; j < m; j++) {
    this.bullets[j].draw(this.ctx);
  }

  this.ship.draw(this.ctx);
};

asteroids.Game.prototype.gameOver = function (intervalId) {
  this.draw();
  clearInterval(intervalId);
}

asteroids.Game.prototype.play = function (selector) {
  var canvas = $('<canvas width="500" height="500"></canvas>');
  $(selector).append(canvas);

  $(document).keydown(function (e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if ((key == 32 || key == 38 || key == 40) && $(selector).length) {
      e.preventDefault();
    }
  });

  var ctx = canvas.get(0).getContext('2d'),
      game = new asteroids.Game(ctx);
  game.start();
}

asteroids.Game.prototype.start = function (ctx) {
  var that = this;

  document.addEventListener("keydown", function (e) {
    switch (e.charCode || e.keyCode) {

      // space
      case 32:
        that.bullets.push(that.ship.fireBullet());
        break;

      // left
      case 37:
        that.ship.start_angle -= .25;
        that.ship.end_angle -= .25;
        that.ship.forward = (that.ship.start_angle + that.ship.end_angle) / 2;
        break;


      // right
      case 39:
        that.ship.start_angle += .25;
        that.ship.end_angle += .25;
        that.ship.forward = (that.ship.start_angle + that.ship.end_angle) / 2;
        break;

      // up
      case 38:
        // TODO: consider adding speed limit
        that.ship.dy += Math.sin(that.ship.forward);
        that.ship.dx += Math.cos(that.ship.forward);
        break;

      // down
      case 40:
        break;
    }
  });

  var intervalId = window.setInterval(function () {
    that.update();
    that.draw(ctx);
    if (that.shipIsHit()) {
      that.gameOver(intervalId);
    }
  }, 35);
};
