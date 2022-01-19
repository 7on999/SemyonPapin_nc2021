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

// gulp.task('copy-img2', function () {
// return gulp
// .src('./src/img/links/*.png')
// .pipe(gulp.dest('./dist/img/links'))
// .pipe(bsync.stream())
// });

// gulp.task('copy-img3', function () {
// return gulp
// .src('./src/img/*.svg')
// .pipe(gulp.dest('./dist/img'))
// .pipe(bsync.stream())
// });

// gulp.task('copy-img4', function () {
//   return gulp
//   .src('./src/img/*.jpg')
//   .pipe(gulp.dest('./dist/img'))
//   .pipe(bsync.stream())
//   });



gulp.task('copy-html', function () {
return gulp
.src('./src/index.html')
.pipe(gulp.dest('./dist/'))
.pipe(bsync.stream())
});

gulp.task('bsync', function () {
  bsync.init({
  server:{
    baseDir: './dist',
    directory: true
    },
    startPath:'./index.html'
  })

  gulp.watch('./src/styles/**/*.less').on('change', gulp.series('less'));
  gulp.watch('./src/index.html').on('change', gulp.series('copy-html'));

  gulp.watch('./dist/index.css').on('change', bsync.reload);
  gulp.watch('./dist/index.html').on('change', bsync.reload);
});

// gulp.task('build-project', gulp.series('less', 'copy-html', 'copy-img', 'copy-img2', 'copy-img3', 'copy-img4'))
gulp.task('build-project', gulp.series('less', 'copy-html', 'copy-img'))

// gulp.task('default', gulp.series( gulp.parallel('less', 'copy-html', 'copy-img', 'copy-img2', 'copy-img3', 'copy-img4'), 'bsync'));
gulp.task('default', gulp.series( gulp.parallel('less', 'copy-html', 'copy-img',), 'bsync'));