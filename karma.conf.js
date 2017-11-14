const path = require("path");

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["mocha", "chai"],
        files: [
            "./test/specs/**/*.spec.js"
        ],
        preprocessors: {
            "./test/**/*.js": ["webpack"]
        },
        webpack: {
            resolve: {
                modules: [path.join(__dirname, "./src"), path.join(__dirname, "./test"), "node_modules"]
            },
            module: {
                rules: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
                ]
            },
            devtool: "#cheap-module-inline-source-map"
        },
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require("karma-webpack"),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-chrome-launcher")
        ],
        reporters: ["dots"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false
    });
};