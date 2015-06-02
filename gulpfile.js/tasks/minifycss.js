var gulp = require('gulp');
// 压缩CSS
var minifycss = require('gulp-minify-css');
// 重命名
var rename = require('gulp-rename');

// 压缩CSS文件   
// gulp.task('minifycss', ['css'], function() {
//     return gulp.src(root + '/css/**/*.css')
//         .pipe(minifycss())
//         .pipe(rename({
//             suffix: "-min"
//         }))
//         .pipe(gulp.dest(root + '/_temp/css'));
// });
