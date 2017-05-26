import { Component, Input } from '@angular/core';
import { INavItem } from '../interfaces/nav-item';
import { expandAnimation } from '../animations/expand.animation';
import { rotateAnimation } from '../animations/rotate.animation';
import { AppService } from '../services/app.service';

@Component({
    selector  : 'my-nav-item',
    animations: [ expandAnimation, rotateAnimation ],
    styles    : [ `
        .subnav-handle {
            float : right;
            color : #FFF;
        }

        a.is-active {
            position : relative;
        }

        a.is-active:before {
            border-left : 3px solid #4dc4ff;
            position    : absolute;
            top         : 0;
            left        : 0;
            bottom      : 0;
            content     : '';
        }

        .child-container {
            overflow         : hidden;
            border-left      : 10px solid rgba(0, 0, 0, 0.3);
            border-top       : 1px solid rgba(0, 0, 0, 0.35);
            border-bottom    : 1px solid rgba(0, 0, 0, 0.1);
            box-shadow       : inset 0 6px 9px -6px rgba(0, 0, 0, 0.5);
            background-color : rgba(0, 0, 0, 0.1);
        }
    ` ],
    template  : `
        <a *ngIf="navItem.hasOwnProperty('route')" md-list-item
           [routerLink]="[navItem.route]" (click)="onClick($event)" [routerLinkActive]="['is-active']">
            <md-icon>{{navItem.icon}}</md-icon>
            {{navItem.name}}
        </a>
        <a *ngIf="navItem.hasOwnProperty('children')" md-list-item (click)="toggleNavChildren()"
           href="javascript:void(0)">
            <md-icon>{{navItem.icon}}</md-icon>
            {{navItem.name}}
            <span class="fill-space"></span>
            <i class="subnav-handle fa fa-angle-up" [@rotateAnimation]="rotateState"></i>
        </a>
        <div *ngIf="showChildren" class="child-container" [attr.data-parent]="navItem.name"
             [@expandAnimation]>
            <my-nav-item *ngFor="let child of navItem.children" [navItem]="child"></my-nav-item>
        </div>`,
})
export class NavItemComponent {
    showChildren = false;
    rotateState  = 'initial';
    @Input() navItem: INavItem;
    
    constructor(private appService: AppService) {
    }
    
    toggleNavChildren() {
        this.showChildren = !this.showChildren;
        this.rotateState  = (this.rotateState === 'initial') ? 'rotated' : 'initial';
    }
    
    onClick(e: MouseEvent) {
        if(this.appService.sideNav.mode === 'over'){
            this.appService.sideNav.close();
        }
    }
}
