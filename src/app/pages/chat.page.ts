import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../services/todo.service';
import { ITodoList } from '../interfaces/todo-list';
import { routeAnimation } from '../animations/route.animation';

@Component({
    selector  : 'my-chat-page',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ `
        ul {
            padding    : 0;
            list-style : none;
        }

        .todo-head {
            display        : flex;
            flex-direction : row;
            align-items    : center;
        }
    ` ],
    template  : `
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                <div class="st-content-top clearfix">
                    <h1 class="st-title">Chat</h1>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a routerLink="/">Home</a>
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
}
