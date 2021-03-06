'use strict';

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin     = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const conf        = require('./conf');
const pacakgeJson = require('../package.json');
const version     = pacakgeJson.version;
let mapsKey       = '';

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
                    {loader: 'ng-router-loader', options: {loader: 'async-require'}},
                    {
                        loader : 'awesome-typescript-loader',
                        options: {configFileName: conf.dir.fromRoot('tsconfig.json')}
                    },
                    'angular2-template-loader'
                ]
            }, {
                test   : /\.s[ac]ss$/,
                use    : [
                    'raw-loader', // creates JS strings
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
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\??\#?v=[.0-9]+)?$/,
                use : 'file-loader?name=assets/[name].[hash].[ext]'
            }, {
                test   : /\.css$/,
                use    : ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap'}),
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
        
        /** enable treeshaking of vendor modules */
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'vendor',
            chunks   : ['app'],
            minChunks: module => /node_modules/.test(module.resource)
        }),
        
        /** define order of chunk imports */
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor']
        }),
        
        /** specify a template and insert chunks */
        new HtmlWebpackPlugin({
            template      : 'public/index.html',
            chunksSortMode: 'dependency',
            chunks        : ['polyfills', 'vendor', 'app']
        }),
        
        /** copy all files from the public folder to the compilation root */
        new CopyWebpackPlugin([{
            from: 'public',
            to  : ''
        }]),
        
        /** Do type checking in a separate process, so webpack don't need to wait. */
        new CheckerPlugin(),
        
        /** replace defined variables during compile time */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV || 'development'),
            'buildConfig.mapsKey'  : JSON.stringify(mapsKey),
            'buildConfig.version'  : JSON.stringify(version),
            'buildConfig.buildTime': JSON.stringify(Date.now())
        }),
        
        /** preload specified assets */
        new PreloadWebpackPlugin({
            rel: 'preload',
            as: 'script',
            include: ['polyfills', 'vendor']
        }),
        
        /** provides global access to aliases(keys) for the library(values) */
        new webpack.ProvidePlugin({
            $     : 'jquery',
            jQuery: 'jquery'
        })
    ]
};
