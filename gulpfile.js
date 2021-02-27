let { src, pipe, dest, series, parallel, watch } = require('gulp');

let sass = require('gulp-sass'); // 把scss转换成css
let cssmin = require('gulp-cssmin'); // 压缩css
let rename = require('gulp-rename'); // 重命名
const autoprefixer = require('gulp-autoprefixer'); // 添加浏览器厂商前缀（can i use）
let del = require('del') // 删除文件夹和文件
let concat = require('gulp-concat'); // 合并js或css
let uglify = require('gulp-uglify'); // 压缩js
var babel = require('gulp-babel'); // es6转为es5 看文档要安装三个包
var browserSync = require('browser-sync'); //可以启动一个服务器 实现页面热更新

function clean() {
    // 清除构建目录dist
    return del('./dist/')
}

// 把scss编译成css
function css() {
    return src('./src/scss/*.scss') //源目录
        .pipe(sass()) //先编译
        .pipe(autoprefixer({
            browsers: ['last 2 versions'] //添加浏览器厂商前缀
        }))
        .pipe(cssmin()) //后压缩
        .pipe(rename({
            suffix: ".min" //文件重命名 添加一个.min
        }))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream()) // 实时把结果同步给浏览器
}

// 合并css或js
function js() {
    return src('./src/js/*.js') //要合并的文件
        // .pipe(concat('all.js')) //合并后的文件名
        .pipe(babel({
            presets: ['@babel/preset-env'] //es6转es5
        }))
        .pipe(uglify()) //压缩js文件
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.stream()) // 实时把结果同步给浏览器
}

// 监听scss和js文件的改变，自动触发js和css任务
function watchTask() {
    browserSync.init({ //启动一个服务器
            server: "./dist" //指定一个网站根目录
        })
        // 监听文件的改变自动执行相应的任务
    watch('./src/scss/*.scss', css) //改变后会自动触发后面的函数
    watch('./src/js/*.js', js)
}


// series(...tasks) ： 串行 执行多个任务
// parallel(...tasks)： 并行 执行多个任务
exports.build = series(clean, parallel(css, js)); // 并行(先删除, 串行(再添加))

// 监听任务
exports.watchTask = watchTask;

// 开发阶段一般都是在一个服务器下开发的，可以实现页面的热更新  gulp serve 
exports.serve = parallel(css, js, watchTask)