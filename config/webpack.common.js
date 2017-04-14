'use strict';

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');
const conf              = require('./conf');

module.exports = {
    entry: {
        'app': './client/bootstrap.ts'
    },
    
    resolve: {
        extensions: ['.ts', '.js']
    },
    
    module: {
        rules: [
            {
                test   : /\.ts$/,
                loaders: [
                    {
                        loader : 'awesome-typescript-loader',
                        options: {configFileName: conf.dir.fromRoot('tsconfig.json')}
                    },
                    'angular2-template-loader'
                ]
            }, {
                test: /\.s[ac]ss$/,
                use : [
                    {loader: 'to-string-loader'}, // creates style nodes from JS strings
                    {loader: 'css-loader', options: {sourceMap: true}}, // translates CSS into CommonJS
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ]
            }, {
                test  : /\.html$/,
                loader: 'html-loader'
            }, {
                test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }, {
                test   : /\.css$/,
                exclude: conf.dir.fromRoot('src/app'),
                loader : ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
            }, {
                test   : /\.css$/,
                include: conf.dir.fromRoot('src/app'),
                loader : 'raw-loader'
            }
        ]
    },
    
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/, // The (\\|\/) piece accounts for path separators in *nix and Windows
            conf.dir.fromRoot('src'), // location of your src
            {} // a map of your routes
        ),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),
        
        new HtmlWebpackPlugin({
            template: 'client/public/index.html'
        }),
        
        new CopyWebpackPlugin([{
            from: 'client/public/assets',
            to  : 'assets'
        }])
    ]
};
