'use strict';

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf  = require('./conf');
let mapsKey = '';
try {
    const config = require('../config.json');
    mapsKey      = config.GoogleMapsApiKey;
} catch (err) {
    console.log('WARN - no config file found');
}

module.exports = {
    entry: {
        'app': './src/bootstrap.ts'
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
                    'angular2-template-loader',
                    'angular-router-loader'
                ]
            }, {
                test   : /\.s[ac]ss$/,
                use    : [
                    {loader: 'to-string-loader'}, // creates JS strings
                    {loader: 'css-loader', options: {sourceMap: true}}, // translates CSS into CommonJS Modules
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ],
                exclude: [conf.dir.fromRoot('src/scss')],
                include: [conf.dir.fromRoot('src/app')]
            }, {
                test   : /\.s[ac]ss$/,
                loader : ExtractTextPlugin.extract([
                    {loader: 'css-loader', options: {sourceMap: true}}, // translates CSS into CommonJS Modules
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ]),
                exclude: [conf.dir.fromRoot('src/app')]
            }, {
                test  : /\.html$/,
                loader: 'html-loader'
            }, {
                test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?username=assets/[username].[hash].[ext]'
            }, {
                test   : /\.css$/,
                exclude: conf.dir.fromRoot('app/app'),
                loader : ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
            }
        ]
    },
    
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/, // The (\\|\/) piece accounts for path separators in *nix and Windows
            conf.dir.fromRoot('src'), // location of your app
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'public',
            to  : ''
        }]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'buildConfig.mapsKey' : JSON.stringify(mapsKey)
        }),
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery'
        })
    ]
};
