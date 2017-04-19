import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../reducers/index';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'my-usermenu',
    styles  : [ `
        .usermenu {
            padding          : 20px;
            background-color : #DDD;
            display          : flex;
            align-items      : center;
        }

        .fill {
            flex : 1 1 auto;
        }

        .user-image {
            background-image : url('/assets/img/user.png');
            background-size  : cover;
            border-radius    : 50%;
            width            : 40px;
            height           : 40px;
            margin-right     : 10px;
        }
    ` ],
    template: `
        <div class="usermenu" *ngIf="isAuthenticated">
            <div class="user-image"></div>
            <span class="user-name">{{name}}</span>
            <span class="fill"></span>
            <button md-icon-button [mdMenuTriggerFor]="menu">
                <md-icon>more_vert</md-icon>
            </button>
            <md-menu #menu="mdMenu">
                <button md-menu-item routerLink="/user/profile">
                    <md-icon>account_circle</md-icon>
                    <span>Profile</span>
                </button>
                <button md-menu-item (click)="onLogoutClick()">
                    <i class="fa fa-sign-out"></i>
                    <span>Logout</span>
                </button>
            </md-menu>
        </div>
    `,
})
export class UserMenuComponent implements OnInit {
    isAuthenticated: boolean = false;
    name: string;
    
    constructor(private store: Store<RootState>, private authService: AuthService) {
    }
    
    ngOnInit() {
        this.store.select('user').subscribe((user: any) => {
            this.isAuthenticated = user.isAuthenticated;
            this.name            = user.name;
        });
    }
    
    onLogoutClick() {
        this.authService.logout();
    }
}
