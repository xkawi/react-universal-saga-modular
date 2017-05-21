const buildExtractStylesLoader = require('./buildExtractStylesLoader');
const fontAwesomeConfig = require('./font-awesome.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

fontAwesomeConfig.styleLoader = buildExtractStylesLoader(
  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'less-loader']
  })
);

module.exports = fontAwesomeConfig;

