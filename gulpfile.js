const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer').default;
const cleanCSS = require('gulp-clean-css');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream())
})

gulp.task('watch', function() {
    gulp.watch("src/scss/*.scss", gulp.parallel('styles'))
    gulp.watch("src/*.html").on("change", browserSync.reload)
})

gulp.task('default', gulp.parallel('browser-sync', 'styles', 'watch'))