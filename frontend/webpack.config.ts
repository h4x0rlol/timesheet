const Dotenv = require("dotenv-webpack");
module.exports = {
  entry: ["./src/index.tsx"],
  plugins: [
    new Dotenv({
      path: "./.env",
      safe: true,
    }),
  ],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  output: {
    path: __dirname + "/dist",
    filename: "build.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    hot: false,
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|gif|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/dist/assets/",
          publicPath: "/dist/assets/",
        },
      },
      {
        test: /(\.ts|\.tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
