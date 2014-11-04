/**
 * @author myqianlan
 * @date 2014-11-4 15:04:26
 * @license MIT
 */
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
// browser-sync
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// browser-sync server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "app",
            middleware: function(req, res, next) {
                //  TODO:不知道这个中间件有神马用，待研究
                console.log("Hi from middleware");
                next();
            }
        },
        port: port
    });
});

// Server Settings
var root = 'app';
var port = 3000;

// jshint task

gulp.task('jshint', function() {
    gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile SASS  

gulp.task('sass', function() {
    gulp.src(root + '/scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(root + '/css'));
});

// 自动添加浏览器前缀 & auto-inject into browsers 
// By default, Autoprefixer uses > 1%, last 2 versions, Firefox ESR, Opera 12.1
gulp.task('autoprefixer', function() {
    gulp.src(root + '/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(root + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 拼接、简化JS文件 
// 未使用

gulp.task('minifyjs', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 拼接、简化CSS文件   
// 未使用
gulp.task('minifycss', function() {
    gulp.src('css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});
//
gulp.task('dev', ['sass', 'autoprefixer', 'browser-sync'], function() {

    // 监视scss文件的变化,并且执行sass
    // 如果scss文件夹为空，任务会中断
    gulp.watch(root + '/scss/**/*.scss', ['sass', 'autoprefixer']);
    //监视html和js文件
    gulp.watch([root + "/*.html", root + "/js/**/*.js"], [browserSync.reload]);
});

// 默认任务   
gulp.task('default', function() {

});
// TODO:构建任务