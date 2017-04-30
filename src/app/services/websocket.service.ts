import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';


@Injectable()
export class WebSocketService {
    private socket: Rx.Subject<MessageEvent>;
    
    public connect(url: string): Rx.Subject<MessageEvent> {
        if (!this.socket) {
            this.socket = this.create(url);
        }
        
        return this.socket;
    }
    
    private create(url: string): Rx.Subject<MessageEvent> {
        const socket     = io(url, { path: '/api/chat' });
        const observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
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
        
        return Rx.Subject.create(observer, observable);
    }
}
