
const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./entry.js"),
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
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
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js",
      "vue-scroll-picker": path.resolve(__dirname, "../../src/index.js"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}
