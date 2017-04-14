import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { routes }   from './routes';
import { App } from './src/app';
import { HomePage } from './src/pages/home.page';
import { LoginPage } from './src/pages/login.page';
import { TodoList } from './src/components/todolist';

import { todos } from './src/common/stores/todo.store';

@NgModule({
    imports     : [
        BrowserModule,
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
