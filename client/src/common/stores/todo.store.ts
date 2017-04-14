import { Action } from '@ngrx/store';

export const ADD_TODO    = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const todos = (state: any = [], { type, payload }: Action) => {
    switch (type) {
        case ADD_TODO:
            return [ ...state, payload ];
        case REMOVE_TODO:
            return state.splice(0,1);
        case UPDATE_TODO:
            const item = state.find((item: any) => item.id === payload.id);
            console.log(item);
            return state;
        
        default:
            return state;
    }
};
