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
