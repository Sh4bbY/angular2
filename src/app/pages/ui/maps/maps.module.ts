import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapsPage } from './maps.page';
import { MaterialModule } from '../../../modules/material.module';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

declare const buildConfig: any;

@NgModule({
    imports     : [
        CommonModule,
        RouterModule.forChild([ { path: '', component: MapsPage } ]),
        MaterialModule,
        AgmCoreModule.forRoot({
            apiKey: buildConfig.mapsKey,
        }),
    ],
    declarations: [ MapsPage ],
})
export class MapsModule {
}
