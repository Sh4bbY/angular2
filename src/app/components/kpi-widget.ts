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

        .mat-icon {
            font-size       : 48px;
            width           : 100px;
            height          : 100px;
            display         : flex;
            justify-content : center;
            align-items     : center;
        }

        .content-wrap {
            padding-left    : 20px;
            display         : flex;
            flex-direction  : column;
            justify-content : center;
        }

        .title {
            margin-bottom : 10px;
        }

        .mat-card {
            padding        : 0;
            display        : flex;
            flex-direction : row;
        }
    ` ],
    template  : `
        <md-card>
            <md-icon [style.background-color]="color">{{icon}}</md-icon>
            <div class="content-wrap">
                <h4 class="title">
                    <ng-content></ng-content>
                </h4>
                <span *ngIf="type == 'number'" class="value">{{count | number:format}}</span>
                <span *ngIf="type == 'currency'" class="value">{{count | currency:'EUR':true}}</span>
                <span *ngIf="type == 'percent'" class="value">{{count | percent:format}}</span>
            </div>
        </md-card>
    `,
})
export class KpiWidgetComponent implements OnInit {
    @Input('value') value: number;
    @Input('duration') duration: number;
    @Input('type') type: string;
    @Input('color') color: string = 'rgba(18,52,86,0.5)';
    @Input('icon') icon: string = 'settings';
    @Input('format') format: string = '2.3-3';
    
    tickSize: number;
    count: number;
    increment: number;
    fps = 20;
    
    ngOnInit() {
        this.count       = 0;
        const tickAmount = Math.round(this.fps * (this.duration / 1000));
        this.tickSize    = this.duration / tickAmount;
        this.increment   = (this.tickSize * this.value) / this.duration;
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
