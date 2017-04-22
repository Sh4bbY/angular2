import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'my-login',
    styles  : [ `
        .login-page {
            position: relative;
            max-width  : 400px;
            padding    : 15px;
            text-align : center;
        }

        .full-width {
            width : 100%;
        }` ],
    template: `
        <div class="login-page">
            <div *ngIf="loading" class="loading-spinner">
                <div class="spinner-bounce-circle">
                    <div></div>
                    <div></div>
                </div>
                <span>Loading</span>
            </div>
            <h2>MyApplication Login</h2>
            <form #f="ngForm" name="login-form" (ngSubmit)="login()" novalidate>
                <md-input-container class="full-width">
                    <input mdInput name="name" [(ngModel)]="model.name" placeholder="Username">
                </md-input-container>

                <md-input-container class="full-width">
                    <input mdInput name="password" [(ngModel)]="model.password" type="password" placeholder="Password">
                </md-input-container>

                <md-hint *ngIf="error">{{error}}</md-hint>

                <button md-raised-button type="submit" color="primary" class="full-width" [disabled]="loading">Login
                </button>
                <p routerLink="/forgot-password">Forgot password?</p>
                <p>Do not have an account?</p>
                <button md-raised-button type="button" color="accent" class="full-width" routerLink="/register">
                    Register
                </button>
            </form>
        </div>`,
})
export class LoginComponent implements OnInit {
    loading: boolean;
    model: any;
    error: string;
    
    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                private router: Router) {
    }
    
    ngOnInit() {
        this.loading = false;
        this.error   = null;
        this.model   = {};
        this.userService.getUser().subscribe(user => {
            if (user.isAuthenticated) {
                this.router.navigateByUrl('/');
            }
        });
    }
    
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.name, this.model.password)
            .subscribe(result => {
                if (result) {
                    this.router.navigateByUrl('/');
                } else {
                    this.error   = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
                this.error   = error;
                this.loading = false;
            });
    }
}
