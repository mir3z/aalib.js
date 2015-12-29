var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src/aalib.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd',
        library: 'aalib',
        filename: 'aalib.js'
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

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.BannerPlugin(require('fs').readFileSync('LICENSE', { encoding: 'utf8' }))
    ],

    devtool: 'source-map'
};