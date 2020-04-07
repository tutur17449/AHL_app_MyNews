const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path');

require('dotenv').config({path: __dirname + '/.env'})

console.log(path.resolve(__dirname, 'src/index.js'))

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins : [
		new HtmlWebpackPlugin({
			inject: true,
      template: './public/index.html',
      minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			}
    }),
    new webpack.DefinePlugin({
      "process.env.API_KEY": JSON.stringify(process.env['API_KEY'])
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    }],
  },
};
