import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { routeAnimation } from '../animations/route.animation';
import { UserService } from '../services/user.service';

@Component({
    animations: [ routeAnimation ],
    template  : `
        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 class="st-title">Registration</h1>
            </div>
            <md-card>
                <md-card-content>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur, dolor dolorem
                        doloremque earum eos magnam, molestiae necessitatibus officiis quas soluta tempora tenetur vel!
                        Deserunt labore magnam nulla recusandae voluptatum!
                    </p>
                    <form [formGroup]="registerForm" (ngSubmit)="submit()" novalidate>
                        <md-input-container class="full-width">
                            <input mdInput formControlName="name" placeholder="Username" autocomplete="off" required>
                            <md-hint align="end" *ngIf="formErrors.name">{{ formErrors.name }}</md-hint>
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input mdInput formControlName="email" placeholder="Email" autocomplete="off" required>
                            <md-hint align="end" *ngIf="formErrors.email">{{ formErrors.email }}</md-hint>
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input #p mdInput formControlName="password" type="password" placeholder="Password"
                                   required>
                            <md-hint align="end" *ngIf="formErrors.password">{{ formErrors.password }}</md-hint>
                        </md-input-container>
                        <md-input-container class="full-width">
                            <input #pc mdInput formControlName="password_confirm" name="password_confirm"
                                   type="password" placeholder="Password confirmation" required>
                            <md-hint align="end" *ngIf="formErrors.password_confirm">
                                {{ formErrors.password_confirm }}
                            </md-hint>
                        </md-input-container>
                        <br/>
                        {{ responseError }}
                        <br/>
                        <button md-raised-button type="submit" color="primary" class="full-width">Register</button>
                        <br/>
                        <br/>
                        <p class="text-center"> Already have an account? </p>
                        <button md-raised-button type="button" color="accent" routerLink="/login" class="full-width">
                            Login
                        </button>
                    </form>
                </md-card-content>
            </md-card>
        </div>`,
})
export class RegistrationPage implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation: any;
    @ViewChild('p') p: ElementRef;
    @ViewChild('pc') pc: ElementRef;
    
    model: any;
    responseError      = '';
    registerForm: FormGroup;
    formErrors         = {
        name            : '',
        email           : '',
        password        : '',
        password_confirm: '',
    };
    validationMessages = {
        name               : {
            required : 'Name is required.',
            minlength: 'Name must be at least 4 characters long.',
            maxlength: 'Name cannot be more than 24 characters long.',
        },
        email              : {
            required : 'Email is required.',
            minlength: 'Email must be at least 4 characters long.',
            pattern  : 'Email must be valid',
        },
        password           : {
            required : 'Password is required.',
            minlength: 'Password must be at least 4 characters long.',
        },
        password_confirm   : {
            required: 'Password confirmation is required.',
        },
        mismatchedPasswords: 'Passwords need to match',
    };
    
    constructor(private fb: FormBuilder,
                private authService: AuthenticationService,
                private userService: UserService,
                private router: Router) {
        this.model = {};
    }
    
    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            if (user.isAuthenticated) {
                this.router.navigateByUrl('/');
            }
            else {
                this.buildForm();
            }
        });
    }
    
    buildForm(): void {
        this.registerForm = this.fb.group({
            name            : [ this.model.name, [
                Validators.required, Validators.minLength(4), Validators.maxLength(24) ],
            ],
            email           : [ this.model.email, Validators.pattern(/[\w-_\.]+@(?:[\w]+\.)+([a-zA-Z]{2,4})/) ],
            password        : [ this.model.password, Validators.minLength(5) ],
            password_confirm: [ this.model.password_confirm ],
        }, { validator: matchingPasswords('password', 'password_confirm') });
        
        this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
    
    onValueChanged(data?: any) {
        if (!this.registerForm)
            return;
        
        const form = this.registerForm;
        
        Object.keys(this.formErrors).forEach(field => {
            this.formErrors[ field ] = '';
            const control            = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[ field ];
                Object.keys(control.errors)
                    .forEach(key => this.formErrors[ field ] += messages[ key ] + '');
            }
            if (form.hasError('mismatchedPasswords')) {
                this.formErrors.password_confirm = this.validationMessages.mismatchedPasswords;
                form.get('password_confirm').setErrors([ 'mismatchedPasswords' ]);
            }
        });
    }
    
    submit() {
        if (!this.registerForm.valid) {
            console.log('form is not valid');
            return;
        }
        this.authService.register(this.registerForm.value)
            .subscribe(
                () => this.router.navigateByUrl('/'),
                (err) => this.handleServerError(err));
    }
    
    handleServerError(err: any) {
        console.log(err);
        switch (err.status) {
            case 406:
                return this.responseError = 'your username or email-address is already being used';
            case 400:
            default:
                return this.responseError = 'something went wrong';
        }
    }
}

function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: any): { [key: string]: any } => {
        const password        = group.controls[ passwordKey ];
        const confirmPassword = group.controls[ confirmPasswordKey ];
        
        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true,
            };
        }
    };
}
