import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { routing }   from './app.routing';
import { HomeComponent } from './components/home.component';

@NgModule({
    imports     : [
        BrowserModule,
        routing,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    bootstrap   : [AppComponent],
})
export class AppModule {
}
