import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    template  : `
        <div class="st-content-top clearfix">
            <h1 class="st-title">Home</h1>
        </div>
    `,
})
export class HomePage {
    @HostBinding('@routeAnimation') routeAnimation:any;
}
