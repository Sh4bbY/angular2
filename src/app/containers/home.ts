import { Component } from '@angular/core';
import { routeAnim } from '../animations/fade.animation';

@Component({
    selector  : 'my-home',
    animations: [ routeAnim ],
    host      : { '[@routeAnim]': '' },
    template  : `
        <h1>HOME!</h1>
    `,
})
export class HomeComponent {
}
