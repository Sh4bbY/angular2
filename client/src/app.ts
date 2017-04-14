import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import '../public/assets/css/styles.css';
import { MdSidenav } from '@angular/material';

@Component({
    selector     : 'my-app',
    templateUrl  : './app.html',
    styles       : [ require('./app.scss') ],
    encapsulation: ViewEncapsulation.None,
})
export class App {
    public navItems = [
        { name: 'Home', route: '/home', icon: 'home' },
        { name: 'Login', route: '/login', icon: 'person outline' },
        { name: 'Todo', route: '/todo', icon: 'checkbox' },
    ];
    
    constructor(private _element: ElementRef) {
    }
    
    toggleSidenav(sidenav: MdSidenav) {
        if (sidenav._isOpened) {
            sidenav.close();
        } else {
            sidenav.open();
        }
    }
    
    toggleFullscreen() {
        let elem = this._element.nativeElement.querySelector('.app-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }
}
