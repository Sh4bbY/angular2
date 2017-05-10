import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { HighchartsPage } from './highcharts.page';

@NgModule({
    imports     : [
        CommonModule,
        MdCardModule,
        RouterModule.forChild([ { path: '', component: HighchartsPage } ]),
    ],
    declarations: [
        HighchartsPage,
    ],
})
export class HighchartsModule {
}
