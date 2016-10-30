export default (app) => {
  const webpackConfig = require('../../../../../webpack.config');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
};
