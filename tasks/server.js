'use strict'

const browserSync = require('browser-sync').create();

module.exports = function () {
  return function () {
    browserSync.init({
      server: "build",
      notify: false
    })
    // browserSync.init({
    //   notify: false,
    //   proxy: 'site'
    // })
    browserSync.watch('build/**/*.*').on('change', browserSync.reload)
  }
}