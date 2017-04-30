import { Component } from '@angular/core';
import { fade } from '../animations/fade.animation';

@Component({
    selector  : 'my-home',
    animations: [ fade ],
    host      : { '[@fade]': '' },
    template  : `
        <h1>HOME!</h1>
    `,
})
export class HomeComponent {
}
