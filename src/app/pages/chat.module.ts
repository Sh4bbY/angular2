import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';
import { ChatPage } from './chat.page';
import { ChatComponent } from '../components/chat';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        RouterModule.forChild([ { path: '', component: ChatPage } ]),
    ],
    providers: [
        WebSocketService,
        ChatService,
    ],
    declarations: [
        ChatComponent,
        ChatPage,
    ],
})
export class ChatModule {
}
