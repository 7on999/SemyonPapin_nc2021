const gulp = require('gulp')
const less = require('gulp-less')
const bsync = require('browser-sync').create()

gulp.task('less', function () {
  return gulp
    .src('./src/styles/blocks/index.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'))
    .pipe(bsync.stream())
});

gulp.task('copy-img', function () {
  return gulp
    .src('./src/img/*.png')
    .pipe(gulp.dest('./dist/img'))
    .pipe(bsync.stream())
});

gulp.task('copy-img2', function () {
  return gulp
    .src('./src/img/links/*.png')
    .pipe(gulp.dest('./dist/img/links'))
    .pipe(bsync.stream())
});

gulp.task('copy-img3', function () {
  return gulp
    .src('./src/img/*.svg')
    .pipe(gulp.dest('./dist/img'))
    .pipe(bsync.stream())
});


gulp.task('copy-html', function () {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(bsync.stream())
});

gulp.task('normilize-css', function () {
  return gulp
    .src('./src/normilize.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(bsync.stream())
});

gulp.task('build-project', gulp.series('less', 'copy-html', 'copy-img', 'copy-img2', 'copy-img3', 'normilize-css'))

gulp.task('bsync', function () {
      bsync.init({
        server:{
          baseDir: './',
          directory: true
        },
        startPath:'/index.html'
      })
});

gulp.task('watch', function () {
  gulp.watch('./src/index.html', ['html'])
  gulp.watch('./src/styles/**/*.less', ['less'])
});

gulp.task('html', function () {
  bsync.reload();
});

gulp.task('default', gulp.series('build-project', 'bsync', 'watch'))