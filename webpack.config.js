const path = require('path');
const webpack = require('webpack');
const TSLintPlugin = require('tslint-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "style.css",
  disable: process.env.NODE_ENV === "development"
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
var cosmiconfig = require('cosmiconfig');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./src/app.ts'],
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { /* Loader options go here */ }
      },
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader', 
        options: {
          transpileOnly: true
        } 
      },
      {
        test: /\.s(a|c)ss$/, 
        loader: 'stylelint' 
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new TSLintPlugin({
      files: ['./src/*.ts']
    }),
    new StyleLintPlugin({
      configFile: path.join(__dirname, './.stylelint.config.js'),
      failOnError: false
    }),
    extractSass,
    new HtmlWebpackPlugin({  
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  watch: true
}
