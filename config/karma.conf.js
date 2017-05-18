'use strict';

const webpackConfig = require('./webpack.test');
const conf          = require('./conf');

module.exports = function (config) {
    const _config = {
        basePath: '.',
        
        frameworks: ['jasmine'],
        
        files: [
            {pattern: './karma-test-shim.js', watched: false}
        ],
        
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        
        webpack          : webpackConfig,
        webpackMiddleware: {stats: 'errors-only'},
        webpackServer    : {noInfo: true},
        
        coverageIstanbulReporter: {
            reports                : ['html', 'text-summary'],
            dir                    : conf.dir.fromRoot('coverage'),
            fixWebpackSourcePaths  : true, // if using webpack and pre-loaders, work around webpack breaking the source path
            skipFilesWithNoCoverage: true, // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            'report-config'        : {
                html: {subdir: 'html'}
            }
        },
        
        reporters: ['mocha', 'coverage-istanbul'],
        port     : 9876,
        colors   : true,
        logLevel : config.LOG_INFO,
        autoWatch: false,
        browsers : ['Chrome'],
        singleRun: true
    };
    
    config.set(_config);
};
