import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    template  : `
        <div class="st-content-top clearfix">
            <h1 class="st-title">Home</h1>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-3">
                <my-kpi-widget [value]="5000" [duration]="1000"
                               [type]="'number'" [format]="'2.0-3'" [color]="'#00c0ef'" [icon]="'polymer'">
                    Example Amount
                </my-kpi-widget>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <my-kpi-widget [value]="0.99573" [duration]="2000"
                               [type]="'percent'" [color]="'#dd4b39'" [icon]="'equalizer'">
                    example Percentage
                </my-kpi-widget>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <my-kpi-widget [value]="120459.354" [duration]="3000"
                               [type]="'number'" [color]="'#00a65a'" [icon]="'shopping_cart'">
                    Example Number
                </my-kpi-widget>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <my-kpi-widget [value]="120459.354" [duration]="4000"
                               [type]="'currency'" [color]="'#f39c12'" [icon]="'euro_symbol'">
                    Expected Revenue
                </my-kpi-widget>
            </div>
        </div>
    `,
})
export class HomePage {
    @HostBinding('@routeAnimation') routeAnimation: any;
}
