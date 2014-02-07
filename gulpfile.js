var gulp = require('gulp')

var concat = require('gulp-concat');

gulp.task('scripts', function () {
  gulp.src('./js/vendor/*.js')
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./dist'))

  gulp.src(['./js/app.js',
            './js/moving_object.js',
            './js/asteroid.js',
            './js/ship.js',
            './js/bullet.js',
            './js/game.js',
            './js/play.js'])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['scripts']);
