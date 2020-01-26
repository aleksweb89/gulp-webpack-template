'use strict'

const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render');
const prettify = require('gulp-prettify');

module.exports = function (options) {
  return function() {
    return gulp.src(options.src)
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./build/css'))
  }
  
};
module.exports = function(options) {
  return renderHtml;
};

const renderHtml = () => {
  nunjucksRender.nunjucks.configure({
      watch: false,
      trimBlocks: true,
      lstripBlocks: false
  });

  return gulp
      .src(['./src/templates/**/[^_]*.html'])
      .pipe(nunjucksRender({
          path: './src/templates'
      }))
      .pipe(prettify({
          indent_size: 2,
          wrap_attributes: 'auto', 
          preserve_newlines: false,
          end_with_newline: true
      }))
      .pipe(gulp.dest('build'));
}

