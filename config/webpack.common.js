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
        'app'      : './src/bootstrap.ts',
        'polyfills': './src/polyfills.ts'
    },
    
    resolve: {
        extensions: ['.ts', '.js']
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                use : [
                   // {loader: 'ng-router-loader', options: {loader: 'async-require'}},
                    {
                        loader : 'awesome-typescript-loader',
                        options: {configFileName: conf.dir.fromRoot('tsconfig.json')}
                    },
                    'angular2-template-loader'
                ]
            }, {
                test   : /\.s[ac]ss$/,
                use    : [
                    'to-string-loader', // creates JS strings
                    {loader: 'css-loader', options: {sourceMap: true}}, // translates CSS into CommonJS Modules
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ],
                exclude: [conf.dir.fromRoot('src/scss')],
                include: [conf.dir.fromRoot('src/app')]
            }, {
                test   : /\.s[ac]ss$/,
                use    : ExtractTextPlugin.extract([
                    {loader: 'css-loader', options: {sourceMap: true}}, // translates CSS into CommonJS Modules
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ]),
                exclude: [conf.dir.fromRoot('src/app')]
            }, {
                test: /\.html$/,
                use : 'html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use : 'file-loader?username=assets/[username].[hash].[ext]'
            }, {
                test   : /\.css$/,
                use    : ExtractTextPlugin.extract({fallback: 'style-loader', loader: 'css-loader?sourceMap'}),
                exclude: conf.dir.fromRoot('app/app')
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
            name     : 'vendor',
            chunks   : ['app'],
            minChunks: module => /node_modules/.test(module.resource)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template      : 'public/index.html',
            chunksSortMode: 'dependency',
            chunks        : ['polyfills', 'vendor', 'app']
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
