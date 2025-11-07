const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    
    gulp.watch("src/scss/**/*.scss", gulp.series('styles'));
    gulp.watch("src/*.html", gulp.series('html'));
    gulp.watch("src/js/**/*.js", gulp.series('scripts'));
    gulp.watch("src/icons/**/*", gulp.series('icons'));
    gulp.watch("src/images/**/*", gulp.series('images'));
});

gulp.task('styles', function(){
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: ".min"}))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*", { encoding: false }) // ← здесь
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src("src/images/**/*", { encoding: false }) // ← и здесь
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.series(
    gulp.parallel('styles', 'html', 'scripts', 'icons', 'images'),
    'server'
));