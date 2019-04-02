var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');

const last_versions = 'last 30 versions';

// cssmin - ok
gulp.task('sass', function () {
    gulp.src(['./css/main.css'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [last_versions],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(plumber())
        .pipe(gulp.dest('./css/min/'));
});

gulp.task('jsmin', function() {
    gulp.src("./js/*js")
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'));
});

// declarada como default - ok
gulp.task('default', ['sass']);

// declarada como watch - ok
gulp.task('watch', function() {
    gulp.watch('./css/main.css', ['sass']);
    gulp.watch('./js/main.js', ['jsmin']);
}); 