const path = require('path');
const webpack = require('webpack');

const DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV !== 'development';
const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
};

module.exports = {
  cache: true,
  devtool: 'cheap-eval-source-map',

  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    alias: {
        'react$': path.resolve(__dirname, './node_modules/react/dist/react-with-addons.min.js'),
        'react-dom$': path.resolve(__dirname, './node_modules/react-dom/index.js')
    }
  },

  module: {
    noParse: [
      path.resolve(__dirname, './node_modules/react/dist/react-with-addons.min.js')
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: true,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
};
