const path = require("path");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "main.js"),
    output: {
        path: __dirname,
        // publicPath: path.basename(__dirname) + "/",
        filename: "bundle.js",
    },
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "async_hooks": false,
            "fs": false
        }
    }
    // module: {
    //     rules: [
    //         { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    //     ]
    // },
    // devtool: "#cheap-module-inline-source-map"
};
