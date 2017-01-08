'use strict';

// webpack config borrowed from https://github.com/preboot/angular-webpack
var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ENV = process.env.npm_lifecycle_event,
    isProd = ENV === 'build';

// We are building the webpack config object
// makeWebpackConfig generates two types of configurations
// one for development and the other (isProd === true) for production
module.exports = (function makeWebpackConfig() {
    var config = {};

    config.entry = {
        app: './src/app/app.js'
    };

    // For production we include the Google Analytics Script
    if (isProd) {
        config.entry.ga = './src/ga.js';
    }

    config.resolve = {
        root : [
            path.resolve('./src'),
            path.resolve('../shared')
        ]
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
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                compressor: {
                    warnings: false
                }
            }),
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