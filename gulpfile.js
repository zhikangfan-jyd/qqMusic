/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 16:02:42
 * @LastEditTime: 2019-10-16 12:05:41
 * @LastEditors: Please set LastEditors
 */
var gulp = require('gulp');

var htmlClean = require('gulp-htmlclean');  //压缩html
var imageMin = require('gulp-imagemin');    //压缩图片
var uglify = require('gulp-uglify');    //压缩js文件
var gulpStripDebug = require('gulp-strip-debug');   //去掉js文件当中的调试语句，比如：debugger、console.log
var gulpLess = require('gulp-less');    //将less文件转化为css文件 
var cleanCss = require('gulp-clean-css');   //压缩css
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var watch = require('gulp-watch');
var connect = require('gulp-connect');  //开启本地服务

//配置默认打包路径和输出路径，以防后续更改打包和输出路径
var pagPath = {
    src:'src/',
    dist:'dist/'
}

var devMod = process.env.NODE_ENV == 'development';//判断是否是开发环境 production生产环境

// export NODE_ENV=development      在命令行设置环境变量

console.log(devMod)
gulp.task('html',function () {

    var prevResult = gulp.src(pagPath.src + 'html/*')
        .pipe(connect.reload());
    if (!devMod) {
        prevResult.pipe(htmlClean());
    }
    prevResult.pipe(gulp.dest(pagPath.dist + 'html/'));
})

gulp.task('css',function () {
    var prevResult = gulp.src(pagPath.src + 'css/*')
        .pipe(connect.reload())
        .pipe(gulpLess())
        .pipe(postCss([autoprefixer()]));
    if (!devMod) {
            prevResult.pipe(cleanCss())
    }
    prevResult.pipe(gulp.dest(pagPath.dist + 'css/'));
})

gulp.task('image',function () {
    gulp.src(pagPath.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(pagPath.dist + 'image/'))
})

gulp.task('js',function () {
    var prevResult = gulp.src(pagPath.src + 'js/*')
        .pipe(connect.reload());
    if (!devMod) {
        prevResult.pipe(gulpStripDebug())
            .pipe(uglify());
    }
    prevResult.pipe(gulp.dest(pagPath.dist + 'js/'));
})

gulp.task('watch',function () {
    watch(pagPath.src + 'html/*',gulp.series('html')) //监听哪个路径下的文件，执行什么任务
    watch(pagPath.src + 'css/*',gulp.series('css'))
    watch(pagPath.src + 'js/*',gulp.series('js'))
})

gulp.task('server',function () {

    //开启一个本地服务，端口号为12306
    connect.server({
        port:'12306'
    })
})
gulp.task('default',gulp.series(gulp.parallel('html','css','image','js','watch','server')))