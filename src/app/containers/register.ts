import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IRegistrationForm } from '../interfaces/forms/registration';

@Component({
    selector: 'my-register',
    styles  : [ `
        .register-page {
            padding: 15px;
            max-width: 400px;
            text-align: center;
        }

        .full-width {
            width: 100%;
        }` ],
    template: `
        <div class="register-page">
            <h2>Create your account at MyApplication</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur, dolor dolorem doloremque
                earum eos magnam, molestiae necessitatibus officiis quas soluta tempora tenetur vel! Deserunt labore
                magnam nulla recusandae voluptatum!
            </p>
            <form>
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
                <button md-raised-button color="primary" (click)="submit()" class="full-width">Register</button>
                <p>
                    Already have an account?
                </p>
                <button md-raised-button color="accent" routerLink="/login" class="full-width">Login</button>
            </form>
        </div>`,
})
export class RegisterPage {
    formData: IRegistrationForm;
    
    constructor(private securityService: AuthService) {
        this.formData = {
            name          : '',
            email         : '',
            password      : '',
            password_check: '',
        };
    }
    
    submit() {
        this.securityService.register(this.formData);
    }
}
