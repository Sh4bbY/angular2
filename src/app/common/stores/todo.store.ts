import { Action } from '@ngrx/store';
import { TodoItem } from '../models/todoitem.model';

export const ADD_TODO    = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

const initialState: Array<TodoItem> = [];

export const todos = (state: Array<TodoItem> = initialState, { type, payload }: Action): Array<TodoItem> => {
    switch (type) {
        case ADD_TODO:
            payload.id = state.length;
            return [ ...state, payload ];
        
        case REMOVE_TODO:
            return state.filter((item: any) => item.id !== payload.id);
        
        case UPDATE_TODO:
            const item = state.find((item: any) => item.id === payload.id);
            item.title = payload.title;
            return state;
        
        default:
            return state;
    }
};
