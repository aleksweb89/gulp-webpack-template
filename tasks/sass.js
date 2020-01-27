'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
  return function() {
    return gulp.src(options.src)
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(sass({
        includePaths: [
          'node_modules'
        ]
      }).on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest('./build/css'))
  }
  
};
