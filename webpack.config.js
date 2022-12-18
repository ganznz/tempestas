const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.(png|jpe?g|gif|mp4)$/i, use: 'file-loader' },
    ],
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};