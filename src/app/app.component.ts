import { Component, ViewChild } from '@angular/core';
import { MdDialog, MdSidenav } from '@angular/material';
import { FeedbackDialogComponent } from './components/feedback-dialog';
import { Observable } from 'rxjs/Observable';
import { RootState } from './reducers/index';
import { setWindowSize } from './reducers/app.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector   : 'my-app',
    templateUrl: './app.html',
})
export class App {
    @ViewChild('sideNav') sideNav: MdSidenav;
    
    windowSize$: Observable<any>;
    navMode  = 'side';
    navOpen  = true;
    navItems = [
        { name: 'Home', route: '/', icon: 'home' },
        { name: 'Todo-List', route: '/todo', icon: 'checkbox' },
        { name: 'Blog', route: '/blog', icon: 'description' },
        { name: 'Create Blog Item', route: '/blog/item/1', icon: 'book' },
    ];
    
    constructor(private store: Store<RootState>, private dialog: MdDialog) {
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
    }
    
    toggleSideNav() {
        if (this.sideNav._isOpened) {
            this.sideNav.close();
        } else {
            this.sideNav.open();
        }
    }
    
    openFeedbackDialog() {
        this.dialog.open(FeedbackDialogComponent);
    }
}
