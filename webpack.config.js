const webpack = require("webpack");
const path = require("path");

module.exports = {

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        library: "aalib",
        filename: "aalib.js"
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.BannerPlugin(require("fs").readFileSync("LICENSE", { encoding: "utf8" }))
    ],

    devtool: "source-map"
};