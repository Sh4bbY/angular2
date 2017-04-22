// loading polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

// loading vendors
import '@angular/platform-browser';
import * as pbd from '@angular/platform-browser-dynamic';
import * as core from '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'rxjs';

import 'sw-toolbox';

if (process.env.NODE_ENV === 'production') {
    core.enableProdMode();
} else {
    // prevents error message about md-theme is not loaded with webpack-dev-server
    require('@angular/material/prebuilt-themes/indigo-pink.css');
    Error[ 'stackTraceLimit' ] = Infinity;
    //require('zone.js/dist/long-stack-trace-zone');
}

// application bootstrap
import { AppModule } from './app/app.module';
import './scss/styles.scss';
pbd.platformBrowserDynamic().bootstrapModule(AppModule);
