'use strict'
const gulp = require('gulp');

lazyRequireTask('sass', './tasks/sass', {src: './src/sass/main.sass'});
lazyRequireTask('nunjucks', './tasks/nunjucks');
lazyRequireTask('webpack', './tasks/webpack');
lazyRequireTask('server', './tasks/server');
lazyRequireTask('clean', './tasks/clean');
lazyRequireTask('watch', './tasks/watch');
lazyRequireTask('assets', './tasks/assets');
lazyRequireTask('php', './tasks/php');

gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'sass', 'nunjucks', 'webpack', 'php')));

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')))

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback){
        let task = require(path).call(this, options);

        return task(callback);
    });
}