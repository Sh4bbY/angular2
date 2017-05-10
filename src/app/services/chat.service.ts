import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';
import { IChatMessage } from '../interfaces/chat-message';
import { IRootState } from '../reducers/index';
import { ADD_CHAT_MESSAGE } from '../reducers/chat.reducer';

const CHAT_URL = 'ws://localhost:8000/api/chat';

@Injectable()
export class ChatService {
    public messages: Subject<IChatMessage>;
    
    constructor(private store: Store<IRootState>, private wsService: WebSocketService, private http: Http) {
    }
    
    connect() {
        this.messages = <Subject<IChatMessage>> this.wsService.connect(CHAT_URL)
            .map((event: MessageEvent): IChatMessage => {
                const msg = event.data;
                this.store.dispatch({ type: ADD_CHAT_MESSAGE, payload: msg });
                this.http.post('/api/chat-msg', msg).subscribe(result => console.log(result));
                return msg;
            });
        return this.messages;
    }
}
