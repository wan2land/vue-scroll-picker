const webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname +  "/dist",
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ],
  },
  externals: {
    vue: "vue",
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
    },
  },
  devtool: "#source-map",
  plugins: [
    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     ie8: true,
    //     ecma: 5,
    //   },
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // }),
  ],
}
