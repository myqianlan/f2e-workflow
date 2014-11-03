// 包含gulp   
var gulp = require('gulp');

// 包含插件   
// JS检查
var jshint = require('gulp-jshint'); 
// sass 编译
var sass = require('gulp-sass');
// 合并
var concat = require('gulp-concat');
// 压缩JS
var uglify = require('gulp-uglify');
// 压缩CSS
var minifycss = require('gulp-minify-css');
// 重命名
var rename = require('gulp-rename');
// 自动加CSS浏览器前缀
var autoprefixer = require('gulp-autoprefixer');

// Server
var http     = require('http');
var connect  = require('connect');
var open     = require('open');

// Server Settings
var root     = './app';
var port     = 3000;
var host     = 'localhost';
var protocol = 'http';

gulp.task('server', function () {
    var app = connect().use(connect.static(root));

    http.createServer(app).listen(port);
    open(protocol + '://' + host + ':' + port + '/index.html');
});

// jshint task

gulp.task('jshint', function () {
    gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译sass  

gulp.task('sass', function () {
    gulp.src(root+'/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(root+'/css'));
});

// 自动添加浏览器前缀
// By default, Autoprefixer uses > 1%, last 2 versions, Firefox ESR, Opera 12.1
gulp.task('autoprefixer', function () {
    gulp.src(root+'/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(root+'/css'));
});

// 拼接、简化JS文件   

gulp.task('minifyjs', function () {
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 拼接、简化CSS文件   

gulp.task('minifycss', function () {
    gulp.src('css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

// 默认任务   
gulp.task('default', ['sass', 'autoprefixer', 'server'], function () {

    // 监视scss文件的变化,并且执行sass
	// 如果scss文件夹为空，任务会中断
    gulp.watch(root+'/scss/**/*.scss', ['sass', 'autoprefixer']);
});
// 构建任务
gulp.task('build', ['jshint', 'minifyjs', 'sass', 'autoprefixer', 'minifycss']);
