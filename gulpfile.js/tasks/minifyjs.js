var gulp = require('gulp');
// 压缩JS
var uglify = require('gulp-uglify');
// 重命名
var rename = require('gulp-rename');

// 压缩JS文件 
// gulp.task('minifyjs', function() {
//     return gulp.src(root + '/js/**/*.js')
//         .pipe(uglify())
//         .pipe(rename({
//             suffix: "-min"
//         }))
//         .pipe(gulp.dest(root + '/_temp/js'));
// });
