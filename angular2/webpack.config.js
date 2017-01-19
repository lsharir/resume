'use strict';

// webpack config borrowed from https://github.com/preboot/angular-webpack
var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    fileAsString = require('../shared/modules/file-as-string.module'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    isProd = process.env.NODE_ENV === 'production';

// We are building the webpack config object
// makeWebpackConfig generates two types of configurations
// one for development and the other (isProd === true) for production
module.exports = (function makeWebpackConfig() {
    var config = {};

    config.entry = {
        loader: '../shared/scripts/loader.js',
        polyfills: './src/polyfills.ts',
        main: './src/main.ts'
    };

    // For production we include the Google Analytics Script
    if (isProd) {
        config.entry.ga = './../shared/scripts/ga.js';
    }

    config.resolve = {
        extensions: ['', '.ts', '.js'],
        root : [
            path.resolve('./src'),
            path.resolve('../shared')
        ]
    };

    config.output = {
        path: __dirname + '/../dist/ng2',
        publicPath: isProd ? '/' : 'http://localhost:4200/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].chunk.js' : '[name].bundle.chunk.js'
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
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                exclude: /styles\.scss$/,
                loader: "raw!postcss!sass"
            },
            {
                test: /styles\.scss$/,
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
            template: './src/index.ejs',
            inject: 'body',
            favicon: '../shared/public/favicon.ico',
            imports: {
                style: fileAsString(path.resolve(__dirname, '../shared/inlined/style.css')),
                ng2Code: fileAsString(path.resolve(__dirname, '../shared/inlined/ng2-code.js')),
                loader: fileAsString(path.resolve(__dirname, '../shared/inlined/inlined-loader-functions.js'))
            }
        }),
        new ExtractTextPlugin('[name].[hash].css', { disable: !isProd }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(isProd ? 'production' : 'development')
            }
        })
    )

    if (isProd) {
        config.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: ['main', 'polyfills']
            }),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    keep_fnames: true
                },
                compressor: {
                    warnings: false
                }
            })
        )
    }

    config.devServer = {
        inline: true,
        port: 4200,
        contentBase: './../shared/public',
        stats: 'minimal',
        noInfo: false,
        hot: true,
        historyApiFallback: true
    };

    return config;
})();