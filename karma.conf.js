var webpack = require('webpack'),
    path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './test/matchers.js',
            './test/specs/**/*.js'
        ],
        preprocessors: {
            './test/**/*.js': ['webpack']
        },
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                root: [path.join(__dirname, "./test"), path.join(__dirname, "./src")]
            },
            module : {
                loaders: [
                    { test: /\.js/, loader: 'babel' }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ],
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};