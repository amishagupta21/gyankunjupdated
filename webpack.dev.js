var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './src/app.js',
  devtool: 'source-map',
    mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/preset-react'] },
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            outputPath: 'images',
          }
        }
      },
]
  },
  output: {
    path: path.resolve(__dirname, './src/vendor'),
    filename: 'bundle.min.js'
  }
};