import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';
import { expandAnimation } from '../animations/expand.animation';
import { rotateAnimation } from '../animations/rotate.animation';

@Component({
    selector  : 'my-kpi-widget',
    animations: [ expandAnimation, rotateAnimation ],
    styles    : [ `
        .value {
            font-weight : 600;
        }
    ` ],
    template  : `
        <md-card>
            <md-icon>settings</md-icon>
            <h4>
                <ng-content></ng-content>
            </h4>
            <span *ngIf="type == 'number'" class="value">{{count | number:'2.3-3'}}</span>
            <span *ngIf="type == 'currency'" class="value">{{count | currency:'EUR':true}}</span>
            <span *ngIf="type == 'percent'" class="value">{{count | percent:'4.0-2'}}</span>
        </md-card>
    `,
})
export class KpiWidgetComponent implements OnInit {
    @Input('value') value: number;
    @Input('duration') duration: number;
    @Input('type') type: string;
    
    tickSize: number;
    count: number;
    increment: number;
    fps = 20;
    
    ngOnInit() {
        this.count       = 0;
        const tickAmount = Math.round(this.fps * (this.duration / 1000));
        this.tickSize    = this.duration / tickAmount;
        this.increment   = Math.round((this.tickSize * this.value) / this.duration);
        this.animate(0);
    }
    
    animate(elapsedTime: number) {
        this.count += this.increment;
        if (this.count < this.value) {
            setTimeout(() => this.animate(elapsedTime + this.tickSize), this.tickSize);
        }
        else {
            this.count = this.value;
        }
    }
}
