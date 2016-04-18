var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var html2react = require('gulp-html2react');
var livereload = require('gulp-livereload');


var srcUrl = './src/',
    distUrl = './dist/',
    tempUrl = './temp/';



//compile html to JavaScript in React syntax.
gulp.task('h2r', function() {
  var option,
      i = process.argv.indexOf("--file");

  if (i > -1) {
      option = process.argv[i+1];
  }

  if (!option) {
    return;
  }

	return gulp.src(option)
		.pipe(html2react())
		.pipe(gulp.dest(tempUrl + 'js'));
});


gulp.task('build', function () {
    return browserify({entries: srcUrl + 'js/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(srcUrl + 'js/*.jsx', ['build']);
});

gulp.task('default', ['watch']);
