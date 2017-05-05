import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'my-user-menu',
    styles  : [ `
        .user-menu {
            padding          : 20px;
            display          : flex;
            align-items      : center;
            background-color : rgba(0,0,0, 0.2);
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
        <div class="user-menu" *ngIf="isAuthenticated">
            <div class="user-image"></div>
            <span class="user-name">{{username}}</span>
            <span class="fill-space"></span>
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
    username: string;
    
    constructor(private store: Store<IRootState>, private authenticationService: AuthenticationService) {
    }
    
    ngOnInit() {
        this.store.select('user').subscribe((user: any) => {
            this.isAuthenticated = user.isAuthenticated;
            this.username        = user.name;
        });
    }
    
    onLogoutClick() {
        this.authenticationService.logout().subscribe();
    }
}
