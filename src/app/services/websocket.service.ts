import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import * as io from 'socket.io-client';


@Injectable()
export class WebSocketService {
    private messageSubject: Subject<MessageEvent>;
    private socket: any;
    
    public connect(url: string): Subject<MessageEvent> {
        if (!this.messageSubject) {
            this.messageSubject = this.create(url);
        }
        return this.messageSubject;
    }
    
    private create(url: string): Subject<MessageEvent> {
        this.socket      = io.connect(url, { path: '/api/chat' });
        const observable = Observable.create((obs: Observer<MessageEvent>) => {
            this.socket.on('message', obs.next.bind(obs));
            this.socket.on('error', obs.error.bind(obs));
            this.socket.on('disconnect', () => {
                this.messageSubject = null;
                return obs.complete.bind(obs);
            });
            return this.socket.close.bind(this.socket);
        });
        
        const observer = {
            next: (data: Object) => {
                if (this.socket.connected) {
                    this.socket.emit('chat-message', data);
                }
            },
        };
        
        return Subject.create(observer, observable);
    }
}
