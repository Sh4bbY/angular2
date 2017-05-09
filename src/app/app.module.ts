// angular
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

// vendors
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalendarModule } from 'angular-calendar';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

// app
import { App } from './app.component';
import { routes }   from './app.routes';
import { MaterialModule } from './modules/material.module';
import { rootReducer } from './reducers/index';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { RegistrationPage } from './pages/registration.page';
import { BlogPage } from './pages/blog/blog.page';
import { ChatPage } from './pages/chat.page';
import { BlogAdminPage } from './pages/blog/blog.admin.page';
import { PostAdminPage } from './pages/blog/post.admin.page';
import { UserProfilePage } from './pages/user/profile.page';
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
import { TodoPage } from './pages/todo.page';
import { TypographyPage } from './pages/ui/typography/typography.page';
import { BackToTopComponent } from './components/back-to-top';
import { D3Page } from './pages/ui/charts/d3/d3.page';
import { NavItemComponent } from './components/nav-item';
import { TablesPage } from './pages/ui/tables/tables.page';
import { BarChartComponent } from './components/charts/bar-chart';
import { PieChartComponent } from './components/charts/pie-chart';
import { HighchartsPage } from './pages/ui/charts/highcharts/highcharts.page';
import { CalendarPage } from './pages/ui/calendar/calendar.page';
import { KpiWidgetComponent } from './components/kpi-widget';

@NgModule({
    imports        : [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        CalendarModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
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
        HomePage,
        LoginPage,
        RegistrationPage,
        UserProfilePage,
        BlogPage,
        BlogAdminPage,
        PostAdminPage,
        TodoPage,
        ChatPage,
        D3Page,
        HighchartsPage,
        TablesPage,
        CalendarPage,
        TodoListComponent,
        TodoItemComponent,
        UserMenuComponent,
        TypographyPage,
        FeedbackDialogComponent,
        ChatComponent,
        BackToTopComponent,
        NavItemComponent,
        BarChartComponent,
        PieChartComponent,
        KpiWidgetComponent,
    ],
    entryComponents: [ FeedbackDialogComponent ],
    bootstrap      : [ App ],
    exports        : [ MaterialModule ],
})
export class AppModule {
}
