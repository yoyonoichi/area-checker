var gulp = require('gulp');
var webpack = require('webpack-stream');
var modify = require('gulp-modify');
var sequence = require('run-sequence');
var base64 = require('gulp-css-base64');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');

var dest = './www/public/';

/***
DEVELOPING
***/
 
//SASS

gulp.task('sass-build', function() {
  return sass(dest + 'scss/*.scss', {sourcemap:false, style:'compressed'})
    .on('error', sass.logError)
    .pipe(gulp.dest(dest + 'css'));
});

//WEBPACK

gulp.task('webpack-build', function() {
  return gulp.src('')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', function() {
      this.emit('end');
    })
    .pipe(gulp.dest(''));
});

/***
WATCH DEFENITION
***/

gulp.task('sass-watch', function() {
  gulp.watch(dest + 'scss/**/*.scss', ['sass-build']);
});

gulp.task('webpack-watch', function() {
  gulp.watch(dest + 'dev/**/*', function() {
    return sequence(
      'webpack-build'
    );
  });
});

/***
BASE64
***/

gulp.task('base64', function() {
  return gulp.src([dest + 'css/style.css'])
    .pipe(base64({
      maxWeightResource: 2000000,
      extensionsAllowed: ['.png', '.gif', '.jpg', '.woff']
    }))
    .pipe(gulp.dest(dest + 'css'));
});

/***
TASK COMMAND
***/

gulp.task('watch', function() {
  return sequence(
    ['webpack-build', 'webpack-watch', 'sass-build', 'sass-watch']
  );
});

gulp.task('build', function() {
  process.argv.push('--build');
  
  return sequence(
    'sass-build',
    'webpack-build',
    'base64'
  );
});

function checkParam(param) {
  var index = process.argv.indexOf('--' + param);
  if(index === -1) {
    return false;
  }else{
    return true;
  }
}

function getParam(param) {
  var index = process.argv.indexOf('--' + param);
  return process.argv[index + 1];
}