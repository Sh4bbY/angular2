import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';
@Component({
    selector  : 'my-tables',
    animations: [ routeAnimation ],
    styles    : [ require('./tables.scss') ],
    template  : require('./tables.html'),
})
export class TablesPage {
    @HostBinding('@routeAnimation') routeAnimation:any;
}
