import { Action } from '@ngrx/store';

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';

export function setWindowSize(): Action {
    return {
        type   : SET_WINDOW_SIZE,
        payload: {
            width : window.innerWidth,
            height: window.innerHeight,
        },
    };
}

export interface IAppState {
    windowSize: { width: number; height: number };
}

const initialState: IAppState = {
    windowSize: { width: 0, height: 0 },
};

export const appReducer = (state = initialState, { type, payload }: Action): IAppState => {
    switch (type) {
        case SET_WINDOW_SIZE:
            return Object.assign({}, state, { windowSize: payload });
        
        default:
            return state;
    }
};
