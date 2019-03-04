const path = require("path");

const conf = {
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

module.exports = (env, options) => {
  conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";

  return conf;
};
