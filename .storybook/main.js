// .storybook/main.js

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {

  stories: ["../src/**/*.stories.js"],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
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
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules/@fortawesome'),
      ],
    });
    // Return the altered config
    return config;
  },
}