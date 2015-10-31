var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var exit = require('gulp-exit');
var rename = require("gulp-rename");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");

gulp.task('test', function () {
    gulp.src(['./tests/**/*-spec.js'])
        .pipe(jasmine({
            verbose: true,
            timeout: 5000,
            includeStackTrace: true
        }))
        .pipe(exit());
});


gulp.task('docs', function () {
    gulp.src(['./framework/**/*.js'])
        .pipe(gulpJsdoc2md())
        .on("error", function (err) {
            gutil.log(gutil.colors.red("jsdoc2md failed"), err.message)
        })
        .pipe(rename(function(path){
            path.extname = ".md";
        }))

        .pipe(gulp.dest("docs"));
});
