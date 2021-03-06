import { Component, HostBinding } from '@angular/core';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    template  : `
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                <div class="st-content-top clearfix">
                    <h1 class="st-title">Chat</h1>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a routerLink="/home">Home</a>
                        </li>
                        <li class="breadcrumb-item active">Chat</li>
                    </ul>
                </div>
                <my-chat></my-chat>
            </div>
        </div>
    `,
})
export class ChatPage {
    @HostBinding('@routeAnimation') routeAnimation:any;
}
