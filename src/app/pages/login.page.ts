import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { LoginFormModel } from '../common/models/forms/login.form.model';
import { Router } from '@angular/router';
import { User } from '../common/models/user.model';

@Component({
    selector: 'my-login',
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
                            <input mdInput name="email" [(ngModel)]="formData.email" placeholder="Email">
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput name="password" [(ngModel)]="formData.password" type="password"
                                   placeholder="Password">
                        </md-input-container>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button md-raised-button color="primary" (click)="submit()">Login</button>
                        <button md-raised-button color="accent" routerLink="/register">Register</button>
                        <button md-raised-button (click)="logout()">Logout</button>
                    </td>
                </tr>
            </table>
        </form>`,
})
export class LoginPage implements OnInit {
    formData: LoginFormModel;
    
    constructor(private authService: AuthService, private router: Router) {
        this.formData = {
            email   : '',
            password: '',
        };
    }
    
    ngOnInit() {
        this.authService.getUser().then((user: User) => {
            if (user.isLoggedIn) {
                this.router.navigateByUrl('/home');
            }
        });
    }
    
    submit() {
        this.authService.login(this.formData);
    }
    
    logout() {
        this.authService.logout();
    }
}
