$(function () {
  var canvas = $('<canvas width="500" height="500"></canvas>');
  $('#asteroids_game').append(canvas);

  var ctx = canvas.get(0).getContext('2d');

  var game = new Asteroids.Game(ctx);
  game.start();

});

$(document).keydown(function (e) {
  var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
  if ((key == 32 || key == 38 || key == 40) && $('#asteroids_game').length) {
    e.preventDefault();
  }
});
