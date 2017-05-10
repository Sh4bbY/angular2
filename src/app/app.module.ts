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
import {
    MdButtonModule, MdCardModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule,
    MdMenuModule, MdSelectModule, MdSidenavModule, MdToolbarModule,
} from '@angular/material';

// app
import { App } from './app.component';
import { routes }   from './app.routes';
import { rootReducer } from './reducers/index';
import { HomePage } from './pages/home.page';
import { UserProfilePage } from './pages/user/profile.page';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { UserMenuComponent } from './components/user-menu';
import { BlogService } from './services/blog.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { FeedbackService } from './services/feedback.service';
import { TypographyPage } from './pages/ui/typography/typography.page';
import { BackToTopComponent } from './components/back-to-top';
import { NavItemComponent } from './components/nav-item';
import { TablesPage } from './pages/ui/tables/tables.page';
import { KpiWidgetComponent } from './components/kpi-widget';
import { RegistrationPage } from './pages/registration.page';
import { LoginPage } from './pages/login.page';

@NgModule({
    imports        : [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        MdInputModule,
        MdIconModule,
        MdSelectModule,
        MdListModule,
        MdCardModule,
        MdButtonModule,
        MdDialogModule,
        MdMenuModule,
        MdSidenavModule,
        MdToolbarModule,
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
        FeedbackService,
        AuthGuard,
    ],
    declarations   : [
        App,
        HomePage,
        UserProfilePage,
        LoginPage,
        RegistrationPage,
        TablesPage,
        UserMenuComponent,
        TypographyPage,
        FeedbackDialogComponent,
        BackToTopComponent,
        NavItemComponent,
        KpiWidgetComponent,
    ],
    entryComponents: [ FeedbackDialogComponent ],
    bootstrap      : [ App ],
})
export class AppModule {
}
