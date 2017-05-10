import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { CalendarModule } from 'angular-calendar';
import { CalendarPage } from './calendar.page';

@NgModule({
    imports     : [
        CommonModule,
        CalendarModule.forRoot(),
        MdButtonModule, MdCardModule,
        RouterModule.forChild([ { path: '', component: CalendarPage } ]),
    ],
    declarations: [ CalendarPage ],
})
export class CalendarPageModule {
}
