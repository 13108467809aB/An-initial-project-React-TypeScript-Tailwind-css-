const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Add the following line:
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: {
          config: './postcss.config.js',
        },
      },
    }),
  ],
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  }
}
