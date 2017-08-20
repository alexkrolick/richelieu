var path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "richilieu.js",
    path: path.resolve(__dirname, "dist"),
    library: "reactStateProvider",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  externals: ["react", "react-dom", "prop-types"],
}
