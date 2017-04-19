import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ILoginForm } from '../interfaces/forms/login';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';

@Component({
    selector: 'my-login',
    styles  : [ `
        .login-page {
            max-width  : 400px;
            padding    : 15px;
            text-align : center;
        }

        .full-width {
            width : 100%;
        }` ],
    template: `
        <div class="login-page">
            <h2>Welcome to MyApplication</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur, dolor dolorem doloremque
                earum eos magnam, molestiae necessitatibus officiis quas soluta tempora tenetur vel! Deserunt labore
                magnam nulla recusandae voluptatum!
            </p>
            <form>
                <md-input-container class="full-width">
                    <input mdInput name="email" [(ngModel)]="formData.email" placeholder="Email">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="password" [(ngModel)]="formData.password" type="password"
                           placeholder="Password">
                </md-input-container>
                <button md-raised-button color="primary" class="full-width" (click)="submit()">Login</button>
                <p routerLink="/forgot-password">Forgot password?</p>
                <p>Do not have an account?</p>
                <button md-raised-button color="accent" class="full-width" routerLink="/register">Register</button>
            </form>
        </div>`,
})
export class LoginPage implements OnInit {
    formData: ILoginForm;
    
    constructor(private authService: AuthService, private router: Router) {
        this.formData = {
            email   : '',
            password: '',
        };
    }
    
    ngOnInit() {
        this.authService.getUser().then((user: IUser) => {
            if (user.isAuthenticated) {
                this.router.navigateByUrl('/home');
            }
        });
    }
    
    submit() {
        this.authService.login(this.formData);
    }
}
