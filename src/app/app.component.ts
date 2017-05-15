import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { IRootState } from './reducers/index';
import { SET_WINDOW_SIZE } from './reducers/app.reducer';
import { AuthenticationService } from './services/authentication.service';
import { INavItem } from './interfaces/nav-item';

@Component({
    selector   : 'my-app',
    templateUrl: './app.html',
})
export class App implements OnInit {
    @ViewChild('sideNav') sideNav: MdSidenav;
    
    windowSize$: Observable<any>;
    isAuthenticated$: Observable<boolean>;
    
    navMode              = 'side';
    navOpen              = false;
    navItems: INavItem[] = [
        { name: 'Home', route: '/home', icon: 'home' },
        { name: 'Blog', route: '/blog', icon: 'description' },
        { name: 'Todo-List', route: '/todo', icon: 'checkbox' },
        { name: 'Chat', route: '/chat', icon: 'chat' },
        {
            name: 'Canvas', icon: 'format_paint', children: [
            { name: 'Game of Life', route: '/canvas/game-of-life', icon: 'blur_on' },
            { name: 'Shooter', route: '/canvas/shooter', icon: 'gamepad' },
            { name: 'Physics', route: '/canvas/physics', icon: 'language' },
        ],
        },
        {
            name: 'UI', icon: 'view_quilt', children: [
            { name: 'Typography', route: '/ui/typography', icon: 'text_format' },
            { name: 'tables', route: '/ui/tables', icon: 'grid_on' },
            {
                name: 'Charts', icon: 'show_chart', children: [
                { name: 'D3 Charts', route: '/ui/charts/d3', icon: 'show_chart' },
                { name: 'Highcharts', route: '/ui/charts/highcharts', icon: 'show_chart' },
            ],
            },
            { name: 'Maps', route: '/ui/maps', icon: 'map' },
            { name: 'Calendar', route: '/ui/calendar', icon: 'event' },
        ],
        },
    ];
    
    constructor(private store: Store<IRootState>,
                private dialog: MdDialog,
                private authenticationService: AuthenticationService) {
        this.windowSize$      = store.select(s => s.app.windowSize);
        this.isAuthenticated$ = store.select(s => s.user.isAuthenticated);
        
        this.subscribeToWindowResize();
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
    
    private subscribeToWindowResize() {
        const createResizeEvent = () => ({
            type   : SET_WINDOW_SIZE,
            payload: { width: window.innerWidth, height: window.innerHeight },
        });
        
        Observable.fromEvent(window, 'load').subscribe(() => this.store.dispatch(createResizeEvent()));
        Observable.fromEvent(window, 'resize')
            .debounceTime(200)
            .subscribe(() => this.store.dispatch(createResizeEvent()));
        
        this.windowSize$.skip(1).subscribe(screen => {
            if (screen.width < 768) {
                this.navMode = 'over';
                this.sideNav.close();
            }
            else {
                this.navMode = 'side';
                this.sideNav.open();
            }
            
            if (screen.width <= 330) {
                document.getElementsByTagName('body')[ 0 ].style.height = `${screen.height}px`;
            } else {
                document.getElementsByTagName('body')[ 0 ].style.height = '';
            }
        });
    }
}
