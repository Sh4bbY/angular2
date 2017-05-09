import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HighchartsPage } from './highcharts.page';
import { MaterialModule } from '../../../../modules/material.module';

@NgModule({
    imports     : [
        CommonModule,
        MaterialModule,
        RouterModule.forChild([ { path: '', component: HighchartsPage } ]),
    ],
    declarations: [
        HighchartsPage,
    ],
})
export class HighchartsModule {
}
