'use strict';

const webpackMerge      = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig      = require('./webpack.common');
const conf              = require('./conf');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    
    output: {
        path         : conf.dir.build,
        publicPath   : 'http://localhost:8080/',
        filename     : '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    
    devServer: {
        historyApiFallback: true,
        stats             : 'minimal'
    }
});
