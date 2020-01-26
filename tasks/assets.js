'use strict'
const gulp = require('gulp');

module.exports = function () {
  return function () {
    return gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('build/assets'))
  }
}