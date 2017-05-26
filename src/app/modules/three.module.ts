import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';
import { SphereComponent } from '../components/sphere';

@NgModule({
    imports     : [
        CommonModule,
        MdCardModule,
        RouterModule.forChild([ { path: 'sphere', component: SphereComponent } ]),
    ],
    declarations: [
        SphereComponent,
    ],
})
export class ThreeModule {
}
