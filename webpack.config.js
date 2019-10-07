const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
})

module.exports = {
  entry: {
    main: path.resolve('src', 'index.js'),
    filters: path.resolve('src', 'filters', 'index.js'),
    renderers: path.resolve('src', 'data-renderers', 'index.js'),
    cells: path.resolve('src', 'types', 'index.js'),
    utils: path.resolve('src', 'utils', 'index.js'),
    icons: path.resolve('src', 'icons', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-object-list',
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
            name: '[name].[hash].[ext]',
          },
        },
      ],
    }],
  },
  plugins: [
    extractSass,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new PeerDepsExternalsPlugin(),
  ],
}
