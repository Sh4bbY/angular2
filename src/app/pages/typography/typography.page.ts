import { Component } from '@angular/core';
import { routeAnimation } from '../../animations/route.animation';

@Component({
    selector  : 'my-typography',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ require('./typography.scss') ],
    template  : require('./typography.html'),
})
export class TypographyPage {
}
