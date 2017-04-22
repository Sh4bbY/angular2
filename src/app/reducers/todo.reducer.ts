import { Action } from '@ngrx/store';
import { ITodoItem } from '../interfaces/todo-item';

export const ADD_TODO    = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const initialState: ITodoItem[] = [];

export const todoReducer = (state: ITodoItem[] = initialState, { type, payload }: Action): ITodoItem[] => {
    switch (type) {
        case ADD_TODO:
            console.log(payload);
            const addItem: ITodoItem = { id: state.length, text: payload.text, complete: false };
            return [ ...state, addItem ];
        
        case REMOVE_TODO:
            return state.filter((item: any) => item.id !== payload.id);
        
        case UPDATE_TODO:
            return state.map((todo: any) => {
                if (todo.id !== payload.id) {
                    return todo;
                }
                return Object.assign({}, todo, {
                    text: payload.text,
                });
            });
        
        case TOGGLE_TODO:
            return state.map((todo: any) => {
                if (todo.id !== payload.id) {
                    return todo;
                }
                return Object.assign({}, todo, {
                    complete: !todo.complete,
                });
            });
        
        default:
            return state;
    }
};
