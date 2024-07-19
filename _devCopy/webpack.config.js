const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "main.js"),
    output: {
        path: __dirname,
        publicPath: path.basename(__dirname) + "/"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devtool: "#cheap-module-inline-source-map"
};