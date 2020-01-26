const gulp = require('gulp');

module.exports = function () {
  return function() {
    gulp.watch('src/sass/**/*.*', gulp.series('sass'));
    gulp.watch('src/assets/**/*.*', gulp.series('assets'));
    gulp.watch('src/php/**/*.*', gulp.series('php'));
    // gulp.watch('src/img/**/*.*', gulp.series('img'));
    // gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
    gulp.watch('src/templates/**/*.*', gulp.series('nunjucks'));
  }
  
}