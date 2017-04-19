import { Action } from '@ngrx/store';
import { ITodoItem } from '../interfaces/todo-item';

export const ADD_TODO    = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

const initialState: ITodoItem[] = [];

export const todoReducer = (state: ITodoItem[] = initialState, { type, payload }: Action): ITodoItem[] => {
    switch (type) {
        case ADD_TODO:
            payload.id = state.length;
            return [ ...state, payload ];
        
        case REMOVE_TODO:
            return state.filter((item: any) => item.id !== payload.id);
        
        case UPDATE_TODO:
            const item = state.find((tmpItem: any) => tmpItem.id === payload.id);
            item.title = payload.title;
            return state;
        
        default:
            return state;
    }
};
