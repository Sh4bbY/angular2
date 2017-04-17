import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../common/models/appstate.model';
import { AuthService } from '../common/services/auth.service';

@Component({
    selector: 'my-usermenu',
    styles  : [ `
        .usermenu {
            padding: 20px;
        }

        .example-header-image {
            background-image: url('/assets/img/user.png');
            background-size: cover;
        }
    ` ],
    template: `
        <div class="usermenu" *ngIf="isLoggedIn">
            <div class="example-header-image"></div>
            <span>{{name}}</span>
            <br/>
            <a routerLink="/user/settings">Settings</a>
            <a href="javascript:void(0);" (click)="onLogoutClick()">Logout</a>
        </div>
    `,
})
export class UserMenuComponent implements OnInit {
    isLoggedIn: boolean = false;
    name: string;
    
    constructor(private store: Store<AppState>, private authService: AuthService) {
    }
    
    ngOnInit() {
        this.store.select('user').subscribe((user: any) => {
            this.isLoggedIn = user.isLoggedIn;
            this.name       = user.name;
        });
    }
    
    onLogoutClick() {
        this.authService.logout();
    }
}
