const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (mode) => ({
  mode,
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    filename: 'kind-of-twitter.[contenthash].min.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: mode === 'production' ? 'none' : 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@action-types': path.resolve(__dirname, 'src/action-types'),
      '@actions': path.resolve(__dirname, 'src/actions'),
      '@reducers': path.resolve(__dirname, 'src/reducers'),
      '@route-types': path.resolve(__dirname, 'src/route-types'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new Dotenv(),
  ],
});
