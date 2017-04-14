import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { MaterialModule } from './material.module';
import { routes }   from './routes';
import { App } from './src/app';
import { HomePage } from './src/pages/home.page';
import { LoginPage } from './src/pages/login.page';
import { TodoList } from './src/components/todolist';

import { todos } from './src/common/stores/todo.store';

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        StoreModule.provideStore({ todos }),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible : false,
                position: 'right',
            }),
        }),
        StoreLogMonitorModule,
        RouterModule.forRoot(routes),
    ],
    exports: [MaterialModule],
    declarations: [
        App,
        HomePage,
        LoginPage,
        TodoList,
    ],
    bootstrap   : [ App ],
})
export class AppModule {
}
