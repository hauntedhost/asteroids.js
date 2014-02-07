asteroids.Ship = function () {
  asteroids.MovingObject.apply(this, arguments);
  this.x = 250;
  this.y = 250;
  this.radius = 12;
  this.dx = 0;
  this.dy = 0;

  this.angle = 0;
  this.start_angle = Math.PI - 0.75;
  this.end_angle = 2 * Math.PI + 0.75;
  this.forward = (this.start_angle + this.end_angle) / 2;
}

// asteroids.Ship.prototype = new asteroids.MovingObject();
$.extend(asteroids.Ship.prototype, new asteroids.MovingObject);

asteroids.Ship.prototype.draw = function (ctx) {

  // circle ship
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1.75;
  ctx.beginPath();

  // full circle
  // ------------
  // ctx.arc(
  //  this.x,
  //  this.y,
  //  this.radius,
  //  0,
  //  2 * Math.PI,
  //  false
  // );

  // semi-circle ship
  // ------------
  ctx.arc(
    this.x,
    this.y,
    this.radius,
    this.start_angle,
    this.end_angle,
    false
  );

  // ---------------
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

};

asteroids.Ship.prototype.fireBullet = function() {
  var bullet = new asteroids.Bullet(this);
  return bullet;
};
