asteroids.Asteroid = function (x, y) {
  asteroids.MovingObject.apply(this, arguments);
  this.radius = Math.random() * 5 + 25;
  this.dx = Math.random() * 5 - 2.5; // -2.5 - 2.5
  this.dy = Math.random() * 5 - 2.5; // -2.5 - 2.5
}

// asteroids.Asteroid.prototype = new asteroids.MovingObject();
$.extend(asteroids.Asteroid.prototype, new asteroids.MovingObject);

asteroids.Asteroid.prototype.draw = function (ctx) {
  var imageObj = new Image();
  // imageObj.src = "./images/asteroid.jpg";
  // var pattern = ctx.createPattern(imageObj, "repeat");
  // ctx.fillStyle = pattern;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();

  ctx.arc(
    this.x,
    this.y,
    // 25,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.stroke();
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fill();
  ctx.restore();
  ctx.closePath();
}
