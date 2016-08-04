//chenyutong@baixing.com
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'anim-it.js',
        path: path.join(__dirname, '/dist'),
        library: 'AnimIt',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        root: ['app/src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                //babel
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    },
    watch: true
};