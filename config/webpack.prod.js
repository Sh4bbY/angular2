'use strict';

const webpack                 = require('webpack');
const webpackMerge            = require('webpack-merge');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const commonConfig = require('./webpack.common.js');
const conf         = require('./conf');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

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
            mangle   : {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new SWPrecacheWebpackPlugin({
            cacheId       : 'my-angular2',
            filename      : 'precache-service-worker.js',
            minify        : false,
            runtimeCaching: [{
                handler   : 'cacheFirst',
                urlPattern: /[.]png$/
            }]
        })
    ]
});
