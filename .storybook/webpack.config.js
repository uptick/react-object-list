const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
            loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'resolve-url-loader' // resolve relative urls inside the css files
        },{
            loader: 'sass-loader?sourceMap' // compiles Sass to CSS
        }],
        include: path.resolve(__dirname, '../src')
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
      }
    ]
  }
}
