/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./app/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ], 
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },

      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
      },

      {
        test: /\.scss$/,
        loaders: [
          // styleFileLoader,
          // 'resolve-url',
          // 'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass?sourceMap'
        ]
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {
        loader: "babel",

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "app"),
        ],
        exclude: /node_modules/,
        // Options to configure babel with
        query: {
          "presets": ["es2015", "stage-0", "react"],
        }
      },
    ]
  },
};
