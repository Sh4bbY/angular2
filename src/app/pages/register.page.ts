import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { RegistrationFormModel } from '../common/models/forms/registration.form.model';

@Component({
    selector: 'my-register',
    styles  : [ `
        .full-width {
            width: 100%;
        }` ],
    template: `
        <form class="login-form">
            <table class="full-width" cellspacing="0">
                <tr>
                    <td>
                        <md-input-container class="full-width">
                            <input mdInput name="username" [(ngModel)]="formData.name" placeholder="Username">
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput name="email" [(ngModel)]="formData.email" placeholder="Email">
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput name="password" [(ngModel)]="formData.password" type="password"
                                   placeholder="Password">
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput name="password_check" [(ngModel)]="formData.password_check" type="password"
                                   placeholder="Password">
                        </md-input-container>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button md-raised-button color="primary" (click)="submit()">Register</button>
                        <button md-raised-button color="accent" routerLink="/login">Login</button>
                    </td>
                </tr>
            </table>
        </form>`,
})
export class RegisterPage {
    formData: RegistrationFormModel;
    
    constructor(private securityService: AuthService) {
        this.formData = {
            name: '',
            email: '',
            password: '',
            password_check: ''
        }
    }
    
    submit() {
        this.securityService.register(this.formData);
    }
}
