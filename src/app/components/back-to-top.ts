import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fadeAnimation } from '../animations/fade.animation';

@Component({
    selector  : 'my-back-to-top',
    animations: [ fadeAnimation ],
    template  : `
        <div *ngIf="isVisible" class="back-to-top" title="back to top" (click)="scrollToTop()" [@fadeAnimation]>
            <i class="fa fa-angle-up"></i>
        </div>
    `,
})
export class BackToTopComponent implements OnInit {
    isVisible = false;
    isActive  = false;
    content: any;
    
    ngOnInit() {
        this.content = document.getElementsByClassName('mat-sidenav-content')[ 0 ];
        console.log(this.content);
        
        Observable.fromEvent(this.content, 'scroll')
            .debounceTime(200)
            .subscribe(() => this.showButton());
    }
    
    showButton() {
        this.isVisible = (this.content.scrollTop > 400);
    }
    
    scrollToTop() {
        if (this.isActive) return;
        this.isActive = true;
        this.scrollTo(this.content, 0, 1250);
    }
    
    private scrollTo(element: any, to: number, duration: number) {
        const start     = element.scrollTop;
        const distance  = to - start;
        const increment = 20;
        
        const animateScroll = (elapsedTime: number) => {
            elapsedTime += increment;
            element.scrollTop = easeInOut(elapsedTime, start, distance, duration);
            if (elapsedTime < duration) {
                setTimeout(() => animateScroll(elapsedTime), increment);
            } else {
                this.isActive = false;
            }
        };
        
        animateScroll(0);
    }
}

function easeInOut(currentTime: number, start: number, change: number, duration: number) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}
