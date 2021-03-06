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
            },
            {
                enforce: 'post',
                test   : /\.ts$/,
                loader : 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    /\.spec\.ts$/
                ]
            },
            {
                test  : /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.s[ac]ss$/,
                use : [
                    {loader: 'raw'}, // takes CSS and import it as string
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ]
            }, {
                test  : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            }, {
                test   : /\.css$/,
                exclude: conf.dir.fromRoot('app/app'),
                loader : 'null-loader'
            }, {
                test   : /\.css$/,
                include: conf.dir.fromRoot('app/app'),
                loader : 'raw-loader'
            }
        ]
    },
    
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,// The (\\|\/) piece accounts for path separators in *nix and Windows
            conf.dir.fromRoot('src'), // location of your app
            {} // a map of your routes
        )
    ]
};
