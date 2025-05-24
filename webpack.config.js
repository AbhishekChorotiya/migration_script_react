const path = require("path");

module.exports = {
  mode: "production", // or 'development'
  entry: "./src/index.js",
  output: {
    filename: "migrationScript.js",
    path: path.resolve(__dirname, "dist"), // Output to a 'build' directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
