import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';

const CHAT_URL = 'ws://localhost:8000/api/chat';

export interface IMessage {
    author: string;
    message: string;
    createdAt: Date;
}

@Injectable()
export class ChatService {
    public messages: Subject<IMessage>;
    
    constructor(wsService: WebSocketService) {
        this.messages = <Subject<IMessage>>wsService.connect(CHAT_URL)
            .map((event: MessageEvent): IMessage => {
                try {
                    const data = JSON.parse(event.data);
                    return {
                        author   : data.author,
                        message  : data.message,
                        createdAt: data.createdAt,
                    };
                } catch (err) {
                    console.log('ERR', err);
                }
            });
    }
}
