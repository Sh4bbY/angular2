'use strict';

const webpackMerge      = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig      = require('./webpack.common');
const conf              = require('./conf');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    
    output: {
        path         : conf.dir.build,
        publicPath   : 'http://localhost:8000/',
        filename     : '[username].js',
        chunkFilename: '[id].chunk.js'
    },
    
    plugins: [
        new ExtractTextPlugin('[username].css')
    ],
    
    devServer: {
        historyApiFallback: true,
        port              : 8000,
        stats             : 'minimal',
        proxy             : {
            '/api/*': {
                target: 'http://localhost:8001',
                secure: false
            }
        }
    }
});
