const MiniCssExtractPlugin = require("mini-css-extract-plugin")


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
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
}
