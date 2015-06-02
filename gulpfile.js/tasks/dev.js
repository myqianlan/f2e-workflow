var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('dev', function(cb) {
  gulpSequence('cleancss', ['sass'], ['watch'], cb);
});
