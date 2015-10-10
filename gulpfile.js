var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var exit = require('gulp-exit');

gulp.task('test', function() {
    gulp.src(['./tests/**/*-spec.js'])
        .pipe(jasmine({
            verbose: true,
            timeout: 5000,
            includeStackTrace: true
        }))
        .pipe(exit());
});
