import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPage } from './registration.page';

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        RouterModule.forChild([ { path: '', component: RegistrationPage } ]),
    ],
    declarations: [
        RegistrationPage,
    ],
})
export class RegistrationModule {
}
