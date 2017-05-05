import { Component } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    selector  : 'my-home',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <h1>HOME!</h1>
    `,
})
export class HomeComponent {
}
