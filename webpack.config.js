const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
        // include: path.resolve(__dirname, "src"),
        // exclude: path.resolve(__dirname, "./node_modules")
      }
    ]
  }
};
