import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { CalendarModule } from 'angular-calendar';
import { CalendarPage } from './calendar.page';
import { MaterialModule } from '../../../modules/material.module';

@NgModule({
    imports     : [
        CommonModule,
        CalendarModule.forRoot(),
        RouterModule.forChild([ { path: '', component: CalendarPage } ]),
        MaterialModule,
    ],
    declarations: [ CalendarPage ],
})
export class CalendarPageModule {
}
