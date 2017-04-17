import { Component } from '@angular/core';

@Component({
    selector: 'my-home',
    styles  : [ `
        .example-header-image {
            background-image: url('/assets/img/user.png');
            background-size: cover;
        }
        .fill-space {
            flex: 1 1 auto;
        }
    ` ],
    template: `
        <h1>HOME!</h1>
        <md-card>
            <md-card-header>
                <div md-card-avatar class="example-header-image"></div>
                <md-card-title>Shiba Inu</md-card-title>
                <md-card-subtitle>Dog Breed</md-card-subtitle>
                <span class="fill-space"></span>
                <button md-icon-button [mdMenuTriggerFor]="menu">
                    <md-icon>more_vert</md-icon>
                </button>
                <md-menu #menu="mdMenu">
                    <button md-menu-item>
                        <md-icon>dialpad</md-icon>
                        <span>Redial</span>
                    </button>
                    <button md-menu-item disabled>
                        <md-icon>voicemail</md-icon>
                        <span>Check voicemail</span>
                    </button>
                    <button md-menu-item>
                        <md-icon>notifications_off</md-icon>
                        <span>Disable alerts</span>
                    </button>
                </md-menu>
            </md-card-header>
            <img md-card-image src="/assets/img/dummy.jpg">
            <md-card-content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae culpa deleniti magni molestias
                    placeat quos rem unde. Consequuntur facere maiores minus nihil quis rerum similique tempore vero
                    voluptates voluptatibus?
                </p>
                <span mdTooltip="my tooltip">Tooltip</span>
            </md-card-content>
            <md-card-actions>
                <button md-button>LIKE</button>
                <button md-button>SHARE</button>
            </md-card-actions>
        </md-card>
    `,
})
export class HomePage {
}
