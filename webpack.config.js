const path = require('path');
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./backend/src/config')();

const vendor = [
  'axios',
  'immutable',
  'lodash',
  'moment',
  'react',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-helmet',
  'react-immutable-proptypes',
  'react-redux',
  'react-router',
  'react-router-bootstrap',
  'react-router-dom',
  'react-router-redux',
  'react-tap-event-plugin',
  'redux',
  'redux-devtools-extension',
  'redux-form',
  'redux-immutable',
  'redux-saga',
  'reselect',
  'socket.io-client'
];

module.exports = {
  entry: {
    bundle: ['babel-polyfill', './frontend/src/index.jsx'],
    vendor
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader', 'eslint-loader']
      },
      {
        use: extract.extract({
          use: ['css-loader', 'sass-loader']
        }),
        test: /\.(css|scss)$/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new extract('style.css'),
    new HtmlWebpackPlugin({
      template: 'frontend/src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_SOCKET_IO_URL: JSON.stringify(config.socket_io_uri)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] })
  ]
};
