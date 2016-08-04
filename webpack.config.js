//chenyutong@baixing.com
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _ = require('lodash');

module.exports = _.assign({
    entry: [path.join(__dirname, './app/src/main.jsx'), path.join(__dirname, './app/src/index.js')],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        hash: true,
        publicPath: '/'
    },
    resolve: {
        root: ['app/src'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            //moment: path.join(__dirname, './node_modules/moment/src/moment')
        }
    },
    module: {
        loaders: [{
            //文件加载
            test: /\.(woff|ttf|eot|svg)([\?]?.*)$/,
            loader: 'file-loader'
        },{
            //图片加载器
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?prefix=font/&limit=8192'
        }, {
            //css加载器
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader')
        }, {
            //babel
            test: /\.(jsx|js)$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            showErrors: true,
            template: path.join(__dirname, '/app/index.ejs'),
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV
        })
    ]
},
    process.env.NODE_ENV == '"production"' ? {} : {devtool: 'eval-source-map', watch: true});