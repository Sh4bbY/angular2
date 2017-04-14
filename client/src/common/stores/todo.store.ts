import { Action } from '@ngrx/store';

export const ADD_TODO    = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const todos = (state: any = [], { type, payload }: Action) => {
    switch (type) {
        case ADD_TODO:
            payload.id = state.length;
            return [ ...state, payload ];
        
        case REMOVE_TODO:
            const i = state.findIndex((item: any) => item.id === payload.id);
            state.splice(i, 1);
            return state;
        
        case UPDATE_TODO:
            const item = state.find((item: any) => item.id === payload.id);
            item.title = payload.title;
            return state;
        
        default:
            return state;
    }
};
