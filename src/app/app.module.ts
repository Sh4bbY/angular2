import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterialModule } from './modules/material.module';
import { routes }   from './app.routes';
import { App } from './app.component';
import { HomePage } from './containers/home';
import { LoginPage } from './containers/login';
import { RegisterPage } from './containers/register';
import { TodoListComponent } from './components/todo-list';
import { AuthService } from './services/auth.service';
import { rootReducer } from './reducers/index';
import { UserMenuComponent } from './components/user-menu';
import { TodoItemComponent } from './components/todo-item';
import { UserProfilePage } from './containers/user-profile';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { BlogItemPage } from './containers/blog/blog-item';
import { BlogService } from './services/blog.service';
import { BlogIndexPage } from './containers/blog/blog-index';

@NgModule({
    imports        : [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        StoreModule.provideStore(rootReducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5,
        }),
        RouterModule.forRoot(routes),
    ],
    providers      : [
        AuthService,
        BlogService,
    ],
    declarations   : [
        App,
        HomePage,
        LoginPage,
        RegisterPage,
        UserProfilePage,
        BlogItemPage,
        BlogIndexPage,
        TodoListComponent,
        TodoItemComponent,
        UserMenuComponent,
        FeedbackDialogComponent,
    ],
    entryComponents: [ FeedbackDialogComponent ],
    bootstrap      : [ App ],
    exports        : [ MaterialModule ],
})
export class AppModule {
}
