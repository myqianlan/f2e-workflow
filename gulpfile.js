/**
 * @author myqianlan
 * @date 2014年11月19日17:12:44
 */
// 包含gulp   
var gulp = require('gulp');

// 包含插件   
// sass 编译
var sass = require('gulp-sass');
// 压缩JS
var uglify = require('gulp-uglify');
// 压缩CSS
var minifycss = require('gulp-minify-css');
// 重命名
var rename = require('gulp-rename');
// 自动加CSS浏览器前缀
var autoprefixer = require('gulp-autoprefixer');
//清除
var rimraf = require('gulp-rimraf');

var chalk = require('chalk');



// Server
var http = require('http');
var connect = require('connect');
var open = require('open');

// Server Settings
var root = './app';
var port = 3000;
var host = 'localhost';
var protocol = 'http';


gulp.task('server', function() {
    var app = connect().use(connect.static(root));

    http.createServer(app).listen(port);
    open(protocol + '://' + host + ':' + port + '/index.html');
});

// clean css files
gulp.task('cleancss', function() {
    return gulp.src(root + '/css', {
            read: false
        }) // much faster
        .pipe(rimraf());
});

// Compile SASS  
// with node sass
gulp.task('sass', ['cleancss'], function() {
    return gulp.src(root + '/scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(root + '/css'));
});

// 自动添加浏览器前缀
// By default, Autoprefixer uses > 1%, last 2 versions, Firefox ESR, Opera 12.1
gulp.task('autoprefixer', function() {
    return gulp.src(root + '/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(root + '/css'));
});


// 压缩JS文件 
gulp.task('minifyjs', function() {
    return gulp.src(root + '/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(root + '/temp'));
});

// 压缩CSS文件   
gulp.task('minifycss', function() {
    return gulp.src(root + '/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest(root + '/temp'));
});

// 重命名，加入时间戳版本号什么的
gulp.task('version', function() {
    return gulp.src(root + '/temp/**/*.*')
        .pipe(rename({
            suffix: '.min-' + new Date().getTime()
        }))
        .pipe(gulp.dest(root + '/dist'));
});

// 使用说明
gulp.task('help', function() {
    console.log(  chalk.white.bgCyan.bold('\n\nF2E-workflow使用说明：\n\n gulp && gulp help：帮助信息\n gulp dev：不带本地服务器的开发\n gulp sdev：带本地服务器的开发\n gulp build：压缩JS CSS代码，并且加时间戳\n\n更多详细的请配置gulpfile.js文件\n\n' )  );
});

// 默认任务   
gulp.task('default', ['help']    
);

// 开发任务
gulp.task('sdev', ['sass', 'autoprefixer', 'server'], function() {

    // 监视scss文件的变化,并且执行sass && autoprefixer
    gulp.watch(root + '/scss/**/*.scss', ['sass', 'autoprefixer']);
});
// 不带本地服务器
gulp.task('dev', ['sass', 'autoprefixer'], function() {
    // 监视scss文件的变化,并且执行sass && autoprefixer
    gulp.watch(root + '/scss/**/*.scss', ['sass', 'autoprefixer']);
});

// 构建任务
gulp.task('build', ['minifyjs', 'sass', 'autoprefixer', 'minifycss', 'version'], function() {
    gulp.src(root + '/temp', {
            read: false
        }) // much faster
        .pipe(rimraf());
});