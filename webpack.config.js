const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
})

module.exports = {
  entry: {
    main: path.resolve('src', 'index.js'),
  },
  output: {
    path: path.resolve('dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(scss|sass)$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'resolve-url-loader', // resolve relative urls inside the css files
        }, {
          loader: 'sass-loader?sourceMap', // compiles Sass to CSS
        }],
      }),
    }, {
      test: /\.(woff2?|eot|ttf|svg|otf)(\?.+)?$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]',
          },
        },
      ],
    }],
  },
  plugins: [
    extractSass,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  externals: [
    'react',
    'react-dom',
  ],
}
