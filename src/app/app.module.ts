// angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
// vendors
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// app
import { App } from './app.component';
import { routes }   from './app.routes';
import { MaterialModule } from './modules/material.module';
import { rootReducer } from './reducers/index';
import { HomePage } from './containers/home';
import { LoginPage } from './containers/login';
import { RegisterPage } from './containers/register';
import { BlogIndexPage } from './containers/blog/blog-index';
import { BlogItemPage } from './containers/blog/blog-item';
import { UserProfilePage } from './containers/user-profile';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { UserMenuComponent } from './components/user-menu';
import { TodoListComponent } from './components/todo-list';
import { TodoItemComponent } from './components/todo-item';
import { BlogService } from './services/blog.service';
import { AuthService } from './services/auth.service';

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
