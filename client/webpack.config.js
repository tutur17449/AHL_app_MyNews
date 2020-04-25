const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');
const terser = require("terser-webpack-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")
const workboxPlugin = require('workbox-webpack-plugin')

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
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
    }),
		new ScriptExtHtmlWebpackPlugin({
			prefetch: [/\.js$/],
			defaultAttribute: 'async'
		}),
    new webpack.DefinePlugin({
      "process.env.API_KEY": JSON.stringify(process.env['API_KEY']),
      "process.env.COOKIE_NAME": JSON.stringify(process.env['COOKIE_NAME'])
    }),
		new WebpackPwaManifest({
			name: 'MyNews • AHL App',
			short_name: 'MyNews',
			description: 'Accèder à toute l\'actualité en un clic : par revue de presse, par thème et par mots clés !',
			theme_color: '#212121',
      background_color: '#212121',
      inject: true,
      fingerprints: true, 
      includeDirectory: true,
      ios: {
        'apple-mobile-web-app-title': 'MyNews',
        'apple-mobile-web-app-status-bar-style': 'white'
      },
			icons: [
				{
					src: path.resolve('public/favicon.png'),
          sizes: [36, 48, 72, 96, 128, 144, 192, 512],
        },
        {
          src: path.resolve('public/favicon-ios.png'),
          sizes: [120, 128, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true
        },
			]
    }),
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimizer: [
      new terser({
        terserOptions: {
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          parse: {
            ecma: 8
          },
          mangle: { safari10: true },
          output: {
            ecma: 5,
            safari10: true,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        sourceMap: false,
        cache: true
      })
    ],
  },
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
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
