var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'main.js'),
    output: {
        path: __dirname,
        publicPath: path.basename(__dirname) + '/'
    },
    resolve: {
        root: path.resolve(__dirname, '../src')
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    devtool: 'source-map'
};