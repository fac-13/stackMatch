const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  entry: {
    index: './src/static/dom/index.js',
    home: './src/static/dom/home.js',
    profile: './src/static/dom/profile.js',
    allmembers: './src/static/dom/allmembers.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'dom/[name].js', // is there a way to not need to do this
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src', 'static', 'dom'),
        loader: 'babel-loader',
      },
    ],
  },
};
