// angular
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { HomeComponent } from './containers/home';
import { LoginComponent } from './containers/login';
import { RegistrationComponent } from './containers/registration';
import { BlogComponent } from './containers/blog/blog';
import { BlogAdminComponent } from './containers/blog/blog.admin';
import { PostAdminComponent } from './containers/blog/post.admin';
import { UserProfileComponent } from './containers/user/profile';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { UserMenuComponent } from './components/user-menu';
import { TodoListComponent } from './components/todo-list';
import { TodoItemComponent } from './components/todo-item';
import { BlogService } from './services/blog.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { WebSocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat';
import { FeedbackService } from './services/feedback.service';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './containers/todo';
import { TypographyComponent } from './containers/typography';
import { BackToTopComponent } from './components/back-to-top';

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
        { provide: LOCALE_ID, useValue: 'de-DE' }, //replace "en-US" with your locale
        AuthenticationService,
        UserService,
        BlogService,
        WebSocketService,
        ChatService,
        FeedbackService,
        TodoService,
        AuthGuard,
    ],
    declarations   : [
        App,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        UserProfileComponent,
        BlogComponent,
        BlogAdminComponent,
        PostAdminComponent,
        TodoComponent,
        TodoListComponent,
        TodoItemComponent,
        UserMenuComponent,
        TypographyComponent,
        FeedbackDialogComponent,
        ChatComponent,
        BackToTopComponent,
    ],
    entryComponents: [ FeedbackDialogComponent ],
    bootstrap      : [ App ],
    exports        : [ MaterialModule ],
})
export class AppModule {
}
