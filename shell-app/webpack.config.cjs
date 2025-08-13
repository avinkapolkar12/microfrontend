const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.mjs',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    minimize: true,
  },
};
