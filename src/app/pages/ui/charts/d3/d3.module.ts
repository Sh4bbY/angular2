import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { D3Page } from './d3.page';
import { MaterialModule } from '../../../../modules/material.module';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../../../components/charts/pie-chart';
import { BarChartComponent } from '../../../../components/charts/bar-chart';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule.forChild([ { path: '', component: D3Page } ]),
        MaterialModule,
    ],
    declarations: [
        D3Page,
        BarChartComponent,
        PieChartComponent,
    ],
})
export class D3Module {
}
