var gulp = require('gulp');
var del = require('del');
var config = require('../config/sass');

gulp.task('cleancss', function (cb) {
  del([
    config.dest
  ], cb);
});
