// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var HappyPack = require('happypack');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'bootstrap-loader',
      'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        use: [ 'happypack/loader' ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { modules: true, importLoaders: 2, sourceMap: true } },
            "postcss-loader",
            { loader: "sass-loader", options: { outputStyle: 'expanded', sourceMapContents: true, sourceMap: true } },
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { modules: true, importLoaders: 2, sourceMap: true } },
            "postcss-loader",
            { loader: "less-loader", options: { outputStyle: 'expanded', sourceMapContents: true, sourceMap: true } },
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/font-woff' }
          }
        ]
      },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader'] },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        use: [ { loader: 'url-loader', options: { limit: 10240 } } ]
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new HappyPack({
      // loaders is the only required parameter:
      threads: 4,
      loaders: [ strip.loader('debug'), 'babel-loader' ],
    }),

    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        "NODE_ENV" : '"production"',
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    webpackIsomorphicToolsPlugin
  ]
};
