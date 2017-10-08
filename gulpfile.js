"use strict";

var pkg = require("./package.json"),
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    sorucemaps = require("gulp-sourcemaps"),
    webserver = require("gulp-webserver"),
    deployDest = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + '/';

gulp.task('sass', function(){
    return gulp.src(['./src/scss/site.scss'])
        .pipe(sorucemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sorucemaps.write())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('dist', function () {

    gulp.src(['./src/img/**/*.*'], {base: './src/img/'})
        .pipe(gulp.dest('./dist/img/'));

    gulp.src(['./src/html/**/*.html'], {base: './src/html/'})
        .pipe(gulp.dest('./dist/'));
});

/**
 * Regular DEV Server at http://localhost:7009/
 */
gulp.task('serve', ['dist', 'sass'], function() {
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);    
    gulp.watch(['./src/html/**/*.html'], ['dist']);    
    
    gulp.src('./dist/')
        .pipe(webserver({
            port: 7001,
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task("default", ['serve']);