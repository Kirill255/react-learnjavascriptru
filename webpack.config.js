const path = require("path");

const conf = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  devServer: {
    proxy: [
      {
        path: "/api/",
        target: "http://localhost:3001"
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
        // include: path.resolve(__dirname, "src"),
        // exclude: path.resolve(__dirname, "./node_modules")
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = (env, options) => {
  conf.devtool = options.mode === "production" ? false : "cheap-module-eval-source-map";

  return conf;
};
