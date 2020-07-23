const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/index.js',
    'production-dependencies': ['phaser'],
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         commons: {
  //           name: 'production-dependencies',
  //           chunks: 'initial',
  //           minChunks: 2,
  //         },
  //       },
  //     },
  //   },

  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'index.html'),
          to: path.resolve(__dirname, 'build'),
        },
        {
          from: path.resolve(__dirname, 'assets', '**', '*'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),

    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
};
