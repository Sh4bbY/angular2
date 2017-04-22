import { Component, OnInit, ViewChild } from '@angular/core';
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
    navOpen  = true;
    navItems = [
        { name: 'Home', route: '/', icon: 'home' },
        { name: 'Todo-List', route: '/todo', icon: 'checkbox' },
        { name: 'Blog', route: '/blog', icon: 'description' },
    ];
    
    constructor(private store: Store<IRootState>,
                private dialog: MdDialog,
                private authenticationService: AuthenticationService) {
        this.windowSize$ = store.select(s => s.app.windowSize);
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
        Observable.fromEvent(window, 'resize')
            .debounceTime(200) // Don't trigger continuous actions
            .subscribe(() => {
                this.store.dispatch(setWindowSize());
            });
        this.isAuthenticated$ = store.select(s => s.user.isAuthenticated);
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
