import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { D3Page } from './d3.page';
import { PieChartComponent } from '../../../../components/charts/pie-chart';
import { BarChartComponent } from '../../../../components/charts/bar-chart';

@NgModule({
    imports     : [
        CommonModule,
        MdCardModule,
        RouterModule.forChild([ { path: '', component: D3Page } ]),
    ],
    declarations: [
        D3Page,
        BarChartComponent,
        PieChartComponent,
    ],
})
export class D3Module {
}
