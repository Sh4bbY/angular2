import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import './scss/styles.scss';

//import 'sw-toolbox';
//import 'hammerjs';
//import 'rxjs';

let decorateModuleRef = <T>(value: T): T => value;

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
    decorateModuleRef = (modRef: any) => {
        disableDebugTools();
        return modRef;
    };
} else {
    decorateModuleRef = (modRef: any) => {
        const appRef = modRef.injector.get(ApplicationRef);
        const cmpRef = appRef.components[ 0 ];
        const _ng    = (<any> window).ng;
        
        enableDebugTools(cmpRef);
        
        (<any> window).ng.probe      = _ng.probe;
        (<any> window).ng.coreTokens = _ng.coreTokens;
        
        return modRef;
    };
}

/** application bootstrap */
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
