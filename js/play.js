asteroids.play = function (selector) {
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
