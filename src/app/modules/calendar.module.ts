import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { CalendarPage } from '../pages/ui/calendar/calendar.page';
import * as AngularCalendar from 'angular-calendar';

@NgModule({
    imports     : [
        CommonModule,
        AngularCalendar.CalendarModule.forRoot(),
        MdButtonModule, MdCardModule,
        RouterModule.forChild([ { path: '', component: CalendarPage } ]),
    ],
    declarations: [ CalendarPage ],
})
export class CalendarModule {
}
