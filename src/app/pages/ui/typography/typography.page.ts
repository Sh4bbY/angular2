import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../../../animations/route.animation';

@Component({
    selector  : 'my-typography',
    animations: [ routeAnimation ],
    styles    : [ require('./typography.scss') ],
    template  : require('./typography.html'),
})
export class TypographyPage {
    @HostBinding('@routeAnimation') routeAnimation:any;
}
