import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 class="st-title">Registration</h1>
            </div>
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
                <br/><br/>
                <p class="text-center"> Already have an account? </p>
                <button md-raised-button type="button" color="accent" routerLink="/login" class="full-width">
                    Login
                </button>
            </form>
        </div>`,
})
export class RegistrationPage implements OnInit {
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
            .subscribe(() => this.router.navigateByUrl('/'));
    }
}
