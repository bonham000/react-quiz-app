'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  var webpackConfig = require('../../../../../webpack.config');
  var webpack = require('webpack');

  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
};