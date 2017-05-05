import { Component } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';

@Component({
    selector  : 'my-tables',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ require('./tables.scss') ],
    template  : require('./tables.html'),
})
export class TablesPage {
}
