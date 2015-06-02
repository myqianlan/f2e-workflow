var gulp     = require('gulp');
var images   = require('../config/images');
var sass     = require('../config/sass');
var watch    = require('gulp-watch');

gulp.task('watch', function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(sass.src, function() { gulp.start('sass'); });
});
