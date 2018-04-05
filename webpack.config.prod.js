const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  entry: [
    './examples/index.js'
  ],
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js'
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
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      title: 'react-eth',
      template: './examples/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          resolve(__dirname, 'examples'),
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
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap'
          ]
        })
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