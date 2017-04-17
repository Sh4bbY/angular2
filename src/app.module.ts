import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './material.module';
import { routes }   from './routes';
import { App } from './app/app';
import { HomePage } from './app/pages/home.page';
import { LoginPage } from './app/pages/login.page';
import { RegisterPage } from './app/pages/register.page';
import { TodoListComponent } from './app/components/todolist';
import { AuthService } from './app/common/services/auth.service';
import { user } from './app/common/stores/user.store';
import { todos } from './app/common/stores/todo.store';
import { UserMenuComponent } from './app/components/usermenu';
import { TodoItemComponent } from './app/components/todoitem';
import { UserSettingsPage } from './app/pages/user.settings.page';

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        StoreModule.provideStore({ todos, user }),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5,
        }),
        RouterModule.forRoot(routes),
    ],
    providers   : [
        AuthService,
    ],
    declarations: [
        App,
        HomePage,
        LoginPage,
        RegisterPage,
        UserSettingsPage,
        TodoListComponent,
        TodoItemComponent,
        UserMenuComponent,
    ],
    bootstrap   : [ App ],
    exports     : [ MaterialModule ],
})
export class AppModule {
}
