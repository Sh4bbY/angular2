import { Component } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <div class="st-content-top clearfix">
            <h1 class="st-title">Home</h1>
        </div>
    `,
})
export class HomePage {
}
