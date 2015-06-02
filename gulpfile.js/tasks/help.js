var gulp = require("gulp")
var gutil    = require('gulp-util');
// 使用说明
gulp.task('help', function() {
    
    var helpmsg = '\n\n'
    +'F2E-workflow使用说明：'
    +'\n\n'
    +'gulp && gulp help：帮助信息'
    +'\n'
    +'gulp clean：删除public文件夹'
    +'\n\n'
    +'更多详细的请配置gulpfile.js文件'
    +'\n\n';

    console.log(gutil.colors.magenta.bgCyan.bold(helpmsg));
});
