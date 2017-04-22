import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private userService: UserService) {
    }
    
    canActivate() {
        return this.userService.getUser().map(user => {
            if (!user.isAuthenticated) {
                this.router.navigateByUrl('/login');
                return false;
            }
            return true;
        });
    }
}
