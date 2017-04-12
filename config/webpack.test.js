'use strict';

const webpack = require('webpack');
const conf    = require('./conf');

module.exports = {
    devtool: 'inline-source-map',
    
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
                test  : /\.html$/,
                loader: 'html-loader'
                
            }, {
                test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            }, {
                test   : /\.css$/,
                exclude: conf.dir.fromRoot('src/app'),
                loader : 'null-loader'
            }, {
                test   : /\.css$/,
                include: conf.dir.fromRoot('src/app'),
                loader : 'raw-loader'
            }
        ]
    },
    
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,// The (\\|\/) piece accounts for path separators in *nix and Windows
            conf.dir.fromRoot('src'), // location of your src
            {} // a map of your routes
        )
    ]
};
