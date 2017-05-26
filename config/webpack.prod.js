'use strict';

process.env.NODE_ENV = 'production';

const webpack                 = require('webpack');
const webpackMerge            = require('webpack-merge');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const commonConfig = require('./webpack.common.js');
const conf         = require('./conf');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    
    output: {
        path         : conf.dir.build,
        publicPath   : '/',
        filename     : '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            sourceMap: true,
            beautify : false, //prod
            output   : {
                comments: false
            }, //prod
            mangle   : {
                screw_ie8: true
            }, //prod
            compress : {
                screw_ie8   : true,
                warnings    : false,
                conditionals: true,
                unused      : true,
                comparisons : true,
                sequences   : true,
                dead_code   : true,
                evaluate    : true,
                if_return   : true,
                join_vars   : true,
                negate_iife : false // we need this for lazy v8
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new SWPrecacheWebpackPlugin({
            cacheId                      : 'shabtech-cache',
            filename                     : 'precache-service-worker.js',
            staticFileGlobsIgnorePatterns: [/^\/api\//],
            minify                       : false,
            mergeStaticsConfig           : true,
            navigateFallback             : '/index.html',
            staticFileGlobs              : [
                '/index.html'
            ],
            runtimeCaching               : [{
                handler    : 'cacheFirst',
                handleFetch: true,
                urlPattern : /[.](png|css|html|jpe?g|gif|svg|woff|woff2|ttf|eot|js|ico)$/
            }]
        })
    ]
});
