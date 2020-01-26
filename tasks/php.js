'use strict'
const gulp = require('gulp');

module.exports = function () {
  return function () {
    return gulp.src('src/php/**/*.*')
      .pipe(gulp.dest('build/php'))
  }
}