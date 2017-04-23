import { Component } from '@angular/core';
import { fade } from '../animations/fade.animation';

@Component({
    selector: 'my-home',
    animations: [ fade ],
    host: { '[@fade]': '' },
    styles  : [ `
        .home {
            display: flex;
            flex-direction: row;
        }

        .example-header-image {
            background-image: url('/assets/img/user.png');
            background-size: cover;
        }

        .fill-space {
            flex: 1 1 auto;
        }

        md-card {
            margin-bottom: 20px;
        }
    ` ],
    template: `
        <h1>HOME!</h1>
        <my-blog></my-blog>
    `,
})
export class HomeComponent {
}
