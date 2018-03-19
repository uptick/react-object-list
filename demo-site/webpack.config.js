var path = require('path');

module.exports = {
  entry: './demos.jsx',
  mode: 'production',
  output: {
    path: __dirname + '/dist',
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
      },
    ],
  },
}
