import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs/Rx';
import * as io from 'socket.io-client';


@Injectable()
export class WebSocketService {
    private socket: Subject<MessageEvent>;
    
    public connect(url: string): Subject<MessageEvent> {
        if (!this.socket) {
            this.socket = this.create(url);
        }
        
        return this.socket;
    }
    
    private create(url: string): Subject<MessageEvent> {
        const socket     = io(url, { path: '/api/chat' });
        const observable = Observable.create((obs: Observer<MessageEvent>) => {
            socket.on('message', obs.next.bind(obs));
            socket.on('error', obs.error.bind(obs));
            socket.on('disconnect', obs.complete.bind(obs));
            return socket.close.bind(socket);
        });
        const observer   = {
            next: (data: Object) => {
                if (socket.connected) {
                    socket.emit('chat-message', JSON.stringify(data));
                }
            },
        };
        
        return Subject.create(observer, observable);
    }
}
