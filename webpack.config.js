const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  entry: './examples/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-eth'
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
