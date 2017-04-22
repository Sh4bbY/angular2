import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'rxjs';
import 'hammerjs';

import 'sw-toolbox';

// prevents error message about md-theme is not loaded with webpack-dev-server
if (process.env.NODE_ENV === 'development') {
    require('@angular/material/prebuilt-themes/indigo-pink.css');
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import './scss/styles.scss';


if (process.env.ENV === 'production') {
    enableProdMode();
} else {
    // Development and test
    Error[ 'stackTraceLimit' ] = Infinity;
    //require('zone.js/dist/long-stack-trace-zone');
}

platformBrowserDynamic().bootstrapModule(AppModule);
