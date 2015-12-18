var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var exit = require('gulp-exit');
var rename = require('gulp-rename');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

gulp.task('test', () => {
    gulp.src(['./tests/**/*-spec.js'])
        .pipe(jasmine({
            verbose: true,
            timeout: 5000,
            includeStackTrace: true
        }))
        .pipe(exit());
});

gulp.task('docs-demos', () => {
    gulp.src(['./demos/**/app/**/*.js'])
        .pipe(gulpJsdoc2md())
        .on('error', err => {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message);
        })
        .pipe(rename((path) => {
            path.extname = '.md';
        }))
        .pipe(gulp.dest('docs/demos'));
});

gulp.task('docs', ['docs-demos'], () => {
    gulp.src(['./framework/**/*.js'])
        .pipe(gulpJsdoc2md())
        .on('error', err => {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message);
        })
        .pipe(rename((path) => {
            path.extname = '.md';
        }))
        .pipe(gulp.dest('docs'));
});
