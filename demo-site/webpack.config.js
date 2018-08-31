const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: 'demos.css',
})

module.exports = {
  entry: './demos.jsx',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demos.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'react',
              'es2015',
              'stage-0',
            ],
          },
        },
      }, {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              minimize: true,
            },
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
      },
    ],
  },
  plugins: [
    extractSass,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
}
