const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          resolve(__dirname, 'src')
        ],
        options: {
          cacheDirectory: true,
          presets: [
            'es2015',
            'react',
            'stage-0'
          ]
        },
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      'src',
      'node_modules'
    ]
  }
};
