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

gulp.task('copy-icons', function () {
  return gulp
    .src('./src/icons/*.png')
    .pipe(gulp.dest('./dist/icons'))
    .pipe(bsync.stream())
});

gulp.task('copy-icons2', function () {
  return gulp
    .src('./src/icons/list-icons/*.png')
    .pipe(gulp.dest('./dist/icons/list-icons'))
    .pipe(bsync.stream())
});

gulp.task('copy-videos', function () {
  return gulp
    .src('./src/video/*.mp4')
    .pipe(gulp.dest('./dist/video'))
    .pipe(bsync.stream())
});

gulp.task('copy-html', function () {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(bsync.stream())
});

gulp.task('build-project', gulp.series('less', 'copy-html', 'copy-icons', 'copy-icons2', 'copy-videos'))

gulp.task('bsync', function () {
      bsync.init({
        server:{
          baseDir: './',
          directory: true
        }
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