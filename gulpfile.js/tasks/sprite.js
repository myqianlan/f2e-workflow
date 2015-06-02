var config      = require('../config/sprite');
var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var imagemin    = require('gulp-imagemin');

// 自动生成雪碧图及其CSS
gulp.task('sprite', function() {
    var spriteData = gulp.src(config.src)
    .pipe(spritesmith(config.settings));
    spriteData.pipe(imagemin())
    .pipe(gulp.dest(config.dest));
});
