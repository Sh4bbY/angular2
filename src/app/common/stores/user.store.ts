import { Action } from '@ngrx/store';
import { User, Right } from '../models/user.model';

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const LOGIN_PENDING     = 'LOGIN_PENDING';
export const LOGIN_SUCCESS     = 'LOGIN_SUCCESS';
export const LOGIN_ERROR       = 'LOGIN_ERROR';
export const LOGOUT            = 'LOGOUT';

const initialState = {
    name      : '',
    email     : '',
    isLoggedIn: false,
    roles     : [ {
        name  : 'Guest',
        rights: [ Right.VIEW_BLOG ],
    } ],
};

export const user = (state: User = initialState, { type, payload }: Action): User => {
    switch (type) {
        case USER_REGISTRATION:
            return payload;
        
        case LOGIN_PENDING:
            return state;
        
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { name: payload.name, email: payload.email, isLoggedIn: true });
        
        case LOGOUT:
            return Object.assign({}, initialState);
    
        case LOGIN_ERROR:
            return state;
            
        default:
            return state;
    }
};
