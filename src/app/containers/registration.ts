import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { IRegistrationForm } from '../interfaces/forms/registration';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-registration',
    styles  : [ `
        .register-page {
            padding    : 15px;
            max-width  : 400px;
            text-align : center;
        }

        .full-width {
            width : 100%;
        }` ],
    template: `
        <div class="register-page">
            <h2>Create your account at MyApplication</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur, dolor dolorem doloremque
                earum eos magnam, molestiae necessitatibus officiis quas soluta tempora tenetur vel! Deserunt labore
                magnam nulla recusandae voluptatum!
            </p>
            <form (ngSubmit)="submit()">
                <md-input-container class="full-width">
                    <input mdInput name="username" [(ngModel)]="model.name" placeholder="Username">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="email" [(ngModel)]="model.email" placeholder="Email">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="password" [(ngModel)]="model.password" type="password"
                           placeholder="Password">
                </md-input-container>
                <md-input-container class="full-width">
                    <input mdInput name="password_check" [(ngModel)]="model.password_check" type="password"
                           placeholder="Password repetition">
                </md-input-container>
                <button md-raised-button type="submit" color="primary" class="full-width">Register</button>
                <p>
                    Already have an account?
                </p>
                <button md-raised-button type="button" color="accent" routerLink="/login" class="full-width">Login</button>
            </form>
        </div>`,
})
export class RegistrationComponent implements OnInit {
    model: any;
    
    constructor(private userService: UserService, private router: Router) {
        this.model = {};
    }
    
    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            if (user.isAuthenticated) {
                this.router.navigateByUrl('/');
            }
        });
    }
    
    submit() {
        this.userService.register(this.model)
            .subscribe(
                () => console.log('registration success'),
                (err) => console.log('registration error', err),
                () => this.router.navigateByUrl('/'));
    }
}
