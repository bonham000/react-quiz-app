const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let devtool;
let entry;
let plugins;
let devServer;

if (process.env.NODE_ENV === 'production') {
  devtool = 'source-map';
  entry = './src/client/index';
  devServer = {
    contentBase: './dist/client',
  };
  plugins = [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ];
} else {
  devtool = 'cheap-module-eval-source-map';
  entry = [
    'webpack-hot-middleware/client?reload=true',
    './src/client/index',
  ];
  devServer = {
    contentBase: './src/client',
  };
  plugins = [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];
}

module.exports = {
  devtool,
  plugins,
  entry,
  devServer,

  debug: true,
  noInfo: false,
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist/client'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        exclude: /(node_modules)/,
      },
      {
        test: /(\.scss|\.css)$/,
        include: /(node_modules)/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
      },
      { test: /.js$/, include: path.join(__dirname, 'src/client'), loaders: ['babel'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/, loader: 'file-loader' },
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  postcss: [autoprefixer],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src/client')],
  },
};
