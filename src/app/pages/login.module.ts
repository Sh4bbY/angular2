import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        RouterModule.forChild([ { path: '', component: LoginPage } ]),
    ],
    declarations: [
        LoginPage,
    ],
})
export class LoginModule {
}
