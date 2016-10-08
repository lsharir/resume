'use strict';

// webpack config borrowed from https://github.com/preboot/angular-webpack
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = (function makeWebpackConfig() {
    var config = {};

    config.entry = {
        app: './src/app/app.js'
    };

    config.output = {
        path: __dirname + '/dist',
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = "#inline-source-map";
    }

    config.module = {
        preLoaders: [],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, 
            {
                test: /\.scss$/,
                
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            }, 
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    };

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.plugins = [];

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('[name].[hash].css', { disable: !isProd })
    )

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        )
    }

    config.devServer = {
        inline: true,
        contentBase: './src/public',
        stats: 'minimal',
        noInfo: false,
        hot: true,
        historyApiFallback: true
    };

    return config;
})();