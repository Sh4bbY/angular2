import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    template  : `
        <div class="st-content-top clearfix">
            <h1 class="st-title">Home</h1>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <my-kpi-widget [value]="5000" [duration]="1000" [type]="'currency'">Example Amount</my-kpi-widget>
            </div>
            <div class="col-lg-3">
                <my-kpi-widget [value]="999" [duration]="2000" [type]="'percent'">example Percentage</my-kpi-widget>
            </div>
            <div class="col-lg-3">
                <my-kpi-widget [value]="120459.354" [duration]="3000" [type]="'number'">Example Number</my-kpi-widget>
            </div>
            <div class="col-lg-3">
                <my-kpi-widget [value]="120459.354" [duration]="4000" [type]="'number'">Expected Revenue</my-kpi-widget>
            </div>
        </div>
    `,
})
export class HomePage {
    @HostBinding('@routeAnimation') routeAnimation:any;
}
