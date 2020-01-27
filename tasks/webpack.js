const path = require('path');
'use strict'

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const named = require('vinyl-named');
const gulplog = require('gulplog');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev =  process.env.NODE_ENV === 'development'

let webConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: ['@babel/polyfill', './src/js/main.js']
  },
  watch: isDev,
  devtool: isDev ? 'cheap-module-inline-source-map' : false,
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [

  ]
};


module.exports = function (callback) {

  return function (callback) {
    let firstBuildReady = false;

    function done(err, stats) {
      firstBuildReady = true;
      if (err) {
        return;
      }
      gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
        colors: true
      }))
    }
    return gulp.src('./src/js/main.js')
      .pipe(plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'webpack',
            message: err.message
          };
        })
      }))
      .pipe(named())
      .pipe(webpackStream(webConfig, null, done))
      .pipe(gulp.dest('./build/js'))
      .on('data', function () {
        if (firstBuildReady) {
          callback();
        }
      })
  }

}