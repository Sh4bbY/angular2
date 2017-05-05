import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 class="st-title">Login</h1>
            </div>
            <md-card>
                <md-card-content>
                    <div *ngIf="loading" class="loading-spinner">
                        <div></div>
                        <span>Loading</span>
                    </div>
                    <form #f="ngForm" name="login-form" (ngSubmit)="login()" novalidate>
                        <md-input-container class="full-width">
                            <input mdInput name="name" [(ngModel)]="model.name" placeholder="Username"
                                   autocomplete="off">
                        </md-input-container>

                        <md-input-container class="full-width">
                            <input mdInput name="password" [(ngModel)]="model.password" type="password"
                                   placeholder="Password" autocomplete="off">
                        </md-input-container>

                        <md-hint *ngIf="error">{{error}}</md-hint>

                        <button md-raised-button type="submit" color="primary" class="full-width" [disabled]="loading">
                            Login
                        </button>
                        <br/> <br/>
                        <p class="text-center"><a href="">Forgot password?</a></p>
                        <p class="text-center">Do not have an account?</p>
                        <button md-raised-button type="button" color="accent" class="full-width" routerLink="/register">
                            Register
                        </button>
                    </form>
                </md-card-content>
            </md-card>
        </div>
    `,
})
export class LoginPage implements OnInit {
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
