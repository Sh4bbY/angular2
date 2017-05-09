import { AfterViewChecked, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { routeAnimation } from '../animations/route.animation';
import { NgForm } from '@angular/forms';

@Component({
    animations: [ routeAnimation ],
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
                    <form #loginForm="ngForm" name="login-form" (ngSubmit)="login()" novalidate>
                        <md-input-container class="full-width">
                            <input mdInput name="name" [(ngModel)]="model.name" placeholder="Username"
                                   autocomplete="off" minlength="4" maxlength="24" required>
                            <md-hint align="end" *ngIf="formErrors.name">{{ formErrors.name }}</md-hint>
                        </md-input-container>

                        <md-input-container class="full-width">
                            <input mdInput name="password" [(ngModel)]="model.password" type="password"
                                   placeholder="Password" autocomplete="off" minlength="5" required>
                            <md-hint align="end" *ngIf="formErrors.password">{{ formErrors.password }}</md-hint>
                        </md-input-container>
                        <md-error *ngIf="responseError">{{responseError}}</md-error>
                        <br/>
                        <br/>
                        <button md-raised-button type="submit" color="primary" class="full-width" [disabled]="loading">
                            Login
                        </button>
                        <br/>
                        <br/>
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
export class LoginPage implements OnInit, AfterViewChecked {
    loginForm: NgForm;
    @ViewChild('loginForm') form: NgForm;
    @HostBinding('@routeAnimation') routeAnimation: any;
    loading: boolean;
    model: any;
    responseError: string;
    
    formErrors         = {
        name    : '',
        password: '',
    };
    validationMessages = {
        name    : {
            required     : 'Name is required.',
            minlength    : 'Name must be at least 4 characters long.',
            maxlength    : 'Name cannot be more than 24 characters long.',
        },
        password: {
            required : 'Password is required.',
            minlength: 'Password must be at least 4 characters long.',
        },
    };
    
    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                private router: Router) {
    }
    
    ngOnInit() {
        this.loading       = false;
        this.responseError = null;
        this.model         = {};
        this.userService.getUser().subscribe(user => {
            if (user.isAuthenticated) {
                this.router.navigateByUrl('/');
            }
        });
    }
    
    ngAfterViewChecked() {
        this.formChanged();
    }
    
    formChanged() {
        if (this.form === this.loginForm)
            return;
        
        this.loginForm = this.form;
        
        if (this.loginForm) {
            this.loginForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }
    
    onValueChanged(data?: any) {
        if (!this.loginForm)
            return;
        
        const form = this.loginForm.form;
        
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[ field ] = '';
            const control            = form.get(field);
            
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[ field ];
                for (const key in control.errors) {
                    this.formErrors[ field ] += messages[ key ] + ' ';
                }
            }
        }
    }
    
    
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.name, this.model.password)
            .subscribe(result => {
                if (result) {
                    this.router.navigateByUrl('/');
                } else {
                    this.responseError = 'Username or password is incorrect';
                    this.loading       = false;
                }
            }, error => {
                this.responseError = error;
                this.loading       = false;
            });
    }
}
