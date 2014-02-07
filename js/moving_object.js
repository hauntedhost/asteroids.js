asteroids.MovingObject = function (x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
}

asteroids.MovingObject.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
};

asteroids.MovingObject.prototype.offScreen = function () {
  if (this.x > 500 || this.x < 0 || this.y < 0 || this.y > 500) {
    return true;
  }
  return false;
};
