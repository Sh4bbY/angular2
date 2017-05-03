import { Action } from '@ngrx/store';
import { IChatMessage } from '../interfaces/chat-message';

export const LOAD_CHAT_MESSAGES = 'LOAD_CHAT_MESSAGES';
export const ADD_CHAT_MESSAGE   = 'ADD_CHAT_MESSAGE';


const initialState: IChatMessage[] = [];

export const chatReducer = (state: IChatMessage[] = initialState, { type, payload }: Action): IChatMessage[] => {
    switch (type) {
        case LOAD_CHAT_MESSAGES:
            return payload;
        
        case ADD_CHAT_MESSAGE:
            return [ ...state, payload ];
        
        default:
            return state;
    }
};
