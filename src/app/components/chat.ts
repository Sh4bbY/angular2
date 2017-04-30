import { Component } from '@angular/core';
import { ChatService, IMessage } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user';

@Component({
    selector: 'my-chat',
    styles  : [ `
        md-card-content {
            max-height : 200px;
            overflow-y : auto;
            word-break : break-all;
        }

        form {
            display        : flex;
            flex-direction : row;
            align-items    : center;
        }
    ` ],
    template: `
        <md-card>
            <md-toolbar color="primary">
                Chat
            </md-toolbar>
            <md-card-content>
                <p *ngFor="let msg of messages">
                    <span>[{{msg.createdAt | date:'mediumTime'}}]</span>
                    <span>{{msg.author}}: </span>
                    <span>{{msg.message}}</span>
                </p>
            </md-card-content>
            <md-card-actions>
                <form #sendMsg="ngForm" (ngSubmit)="onSubmit()">
                    <md-input-container class="full-width">
                        <input mdInput name="message" [(ngModel)]="model.message"
                               placeholder="message..." autocomplete="off">
                    </md-input-container>
                    <button md-raised-button [disabled]="!sendMsg.form.valid" color="primary" type="submit">
                        send
                    </button>
                </form>
            </md-card-actions>
        </md-card>
    `,
})
export class ChatComponent {
    public messages: IMessage[] = [];
    public model: any           = {};
    
    constructor(private chatService: ChatService, private userService: UserService) {
        chatService.messages.subscribe((msg: IMessage) => {
            this.messages.push(msg);
        });
        userService.getUser().subscribe((user: IUser) => {
            this.model.author = user.name;
        });
    }
    
    public onSubmit() {
        this.model.createdAt = new Date();
        this.chatService.messages.next(this.model);
        this.model.message = '';
    }
}

