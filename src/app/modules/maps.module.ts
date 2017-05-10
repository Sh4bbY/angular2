import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MapsPage } from '../pages/ui/maps/maps.page';

declare const buildConfig: any;

@NgModule({
    imports     : [
        CommonModule,
        RouterModule.forChild([ { path: '', component: MapsPage } ]),
        MdCardModule,
        AgmCoreModule.forRoot({
            apiKey: buildConfig.mapsKey,
        }),
    ],
    declarations: [ MapsPage ],
})
export class MapsModule {
}
