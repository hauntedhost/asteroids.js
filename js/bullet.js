asteroids.Bullet = function (ship) {
  asteroids.MovingObject.apply(this, arguments);
  // this.ship = this;
  this.x = ship.x;
  this.y = ship.y;
  this.radius = 3;
  this.dx = Math.cos(ship.forward) * 10; //ship.dx / 1000 + 15;
  this.dy = Math.sin(ship.forward) * 10; //ship.dy / 1000 + 15;

  // bullet vector adjuster
  // this.bulletHelper();
}

// asteroids.Bullet.prototype = new asteroids.MovingObject();
$.extend(asteroids.Bullet.prototype, new asteroids.MovingObject);

asteroids.Bullet.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  ctx.beginPath();

  ctx.arc(
    this.x,
    this.y,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

asteroids.Bullet.prototype.bulletHelper = function () {
  if (this.dx <= 0) {
    this.dx = -15;
  }
};
