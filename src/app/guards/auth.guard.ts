import {  Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private location: Location, private authService: AuthenticationService) {
    }
    
    canActivate() {
        return this.authService.isAuthenticated().map(isAuthenticated => {
            if (!isAuthenticated) {
                this.authService.locationWhenAuthenticated = this.location.path();
                this.router.navigateByUrl('/login');
            }
            return isAuthenticated;
        });
    }
}
