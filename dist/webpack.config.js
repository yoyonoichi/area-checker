const webpack = require('webpack-stream');
const webpackPlugin = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var _build = process.argv.indexOf('--build') !== -1;

var _name = getName();

var dest = './www/public/';

var _plugins = [
  new webpackPlugin.DefinePlugin({
    DEV: !_build,
    UAT: process.argv.indexOf('--uat') !== -1,
    'process.env': {
      NODE_ENV: JSON.stringify(_build ? 'production' : 'develop')  
    }
  })
];

if(_build) {
  _plugins.push(new UglifyJsPlugin());
}

module.exports = {
  entry: {
    main: dest + 'dev/main.es6'
  },
  output: {
    filename: dest + 'js/script.js'
  },
  resolve: {
    extensions: ['.js', '.es6']
  },
  module: {
    loaders: [
      { 
        test: /\.es6$/, 
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['env']}
      }
    ]
  },
  plugins: _plugins
};

function getName() {
  var index = process.argv.indexOf('--name');
  return process.argv[index + 1];
}