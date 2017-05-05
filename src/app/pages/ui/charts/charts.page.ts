import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';

@Component({
    selector  : 'my-charts',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ require('./charts.scss') ],
    template  : require('./charts.html'),
})
export class ChartsPage {
}
