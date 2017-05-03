import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user';
import { IChatMessage } from '../interfaces/chat-message';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { Subject } from 'rxjs/Subject';
import { routeAnim } from '../animations/fade.animation';

@Component({
    selector: 'my-chat',
    animations: [ routeAnim ],
    host      : { '[@routeAnim]': '' },
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
            <md-card-content #msgFrame>
                <div #msgContainer>
                    <p *ngFor="let msg of messages | async">
                        <span>[{{msg.createdAt | date:'mediumTime'}}]</span>
                        <span>{{msg.author}}: </span>
                        <span>{{msg.message}}</span>
                    </p>
                </div>
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
export class ChatComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
            model: any;
            messages: Observable<IChatMessage[]>;
    
    @ViewChild('msgFrame') msgFrame: ElementRef;
    @ViewChild('msgContainer') msgContainer: ElementRef;
    
    constructor(private store: Store<IRootState>, private chatService: ChatService, private userService: UserService) {
        this.model    = {};
        this.messages = store.select(s => s.chat);
    }
    
    ngOnInit() {
        this.chatService.connect().takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                const frameEl     = this.msgFrame.nativeElement;
                const containerEl = this.msgContainer.nativeElement;
                setTimeout(() => frameEl.scrollTop = containerEl.offsetHeight, 0);
            });
        
        this.userService.getUser().takeUntil(this.ngUnsubscribe)
            .subscribe((user: IUser) => {
                this.model.author = user.name;
            });
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    
    public onSubmit() {
        this.model.createdAt = new Date();
        this.chatService.messages.next(this.model);
        this.model.message = '';
    }
}

