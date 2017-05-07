import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSidenav } from '@angular/material';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { Observable } from 'rxjs/Observable';
import { IRootState } from './reducers/index';
import { setWindowSize } from './reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticationService } from './services/authentication.service';

@Component({
    selector   : 'my-app',
    templateUrl: './app.html',
})
export class App implements OnInit {
    @ViewChild('sideNav') sideNav: MdSidenav;
    
    windowSize$: Observable<any>;
    isAuthenticated$: Observable<boolean>;
    
    navMode  = 'side';
    navOpen  = false;
    navItems = [
        { name: 'Home', route: '/home', icon: 'home' },
        { name: 'Blog', route: '/blog', icon: 'description' },
        { name: 'Todo-List', route: '/todo', icon: 'checkbox' },
        { name: 'Chat', route: '/chat', icon: 'chat' },
        { name: 'UI', icon: 'view_quilt', children: [
            { name: 'Typography', route: '/ui/typography', icon: 'text_format' },
            { name: 'tables', route: '/ui/tables', icon: 'grid_on' },
            { name: 'Charts', icon: 'show_chart', children: [
                { name: 'D3 Charts', route: '/ui/charts/d3', icon: 'show_chart' },
                { name: 'Highcharts', route: '/ui/charts/highcharts', icon: 'show_chart' },
            ]},
            { name: 'Maps', route: '/ui/maps', icon: 'map' },
            { name: 'Calendar', route: '/ui/calendar', icon: 'event' },
        ]},
    ];
    
    constructor(private store: Store<IRootState>,
                private dialog: MdDialog,
                private authenticationService: AuthenticationService) {
        this.windowSize$ = store.select(s => s.app.windowSize);
        
        Observable.fromEvent(window, 'load').subscribe(() => this.store.dispatch(setWindowSize()));
        Observable.fromEvent(window, 'resize')
            .debounceTime(200)
            .subscribe(() => this.store.dispatch(setWindowSize()));
        
        this.isAuthenticated$ = store.select(s => s.user.isAuthenticated);
        this.windowSize$.skip(1).subscribe(screen => {
            if (screen.width < 768) {
                this.navMode = 'over';
                this.sideNav.close();
            }
            else {
                this.navMode = 'side';
                this.sideNav.open();
            }
        });
    }
    
    ngOnInit() {
        if (this.authenticationService.token) {
            this.authenticationService.loginByToken().subscribe();
        }
    }
    
    toggleSideNav() {
        if (this.sideNav._isOpened) {
            this.sideNav.close();
        } else {
            this.sideNav.open();
        }
    }
    
    logout() {
        this.authenticationService.logout().subscribe();
    }
    
    openFeedbackDialog() {
        this.dialog.open(FeedbackDialogComponent);
    }
}
