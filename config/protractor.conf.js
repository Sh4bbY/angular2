'use strict';

const {SpecReporter} = require('jasmine-spec-reporter');
const conf           = require('./conf');

exports.config = {
    allScriptsTimeout: 11000,
    specs            : [
        conf.dir.fromRoot('test/e2e/**/*.e2e.ts')
    ],
    exclude          : [],
    capabilities     : {
        'browserName': 'chrome'
    },
    directConnect    : true,
    baseUrl          : 'http://localhost:8000/',
    framework        : 'jasmine2',
    jasmineNodeOpts  : {
        showColors            : true,
        defaultTimeoutInterval: 30000,
        print                 : () => {
        }
    },
    beforeLaunch     : () => {
        require('ts-node').register({
            project: conf.dir.fromRoot('tsconfig.json')
        });
    },
    onPrepare() {
        browser.ignoreSynchronization = true;
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    },
    
    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true
};
