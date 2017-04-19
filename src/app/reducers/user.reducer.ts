import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/user';

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const LOGIN_PENDING     = 'LOGIN_PENDING';
export const LOGIN_SUCCESS     = 'LOGIN_SUCCESS';
export const LOGIN_ERROR       = 'LOGIN_ERROR';
export const LOGOUT            = 'LOGOUT';

const initialState: IUser = {
    id             : '',
    name           : '',
    email          : '',
    isAuthenticated: false,
    isVerified     : false,
    createdAt      : null,
    roles          : [ 'guest' ],
};

export const userReducer = (state: IUser = initialState, { type, payload }: Action): IUser => {
    switch (type) {
        case USER_REGISTRATION:
            return payload;
        
        case LOGIN_PENDING:
            return state;
        
        case LOGIN_SUCCESS:
            const userData = {
                id             : payload.id,
                name           : payload.name,
                email          : payload.email,
                createdAt      : payload.createdAt,
                isAuthenticated: true,
            };
            return Object.assign({}, state, userData);
        
        case LOGOUT:
            return Object.assign({}, initialState);
        
        case LOGIN_ERROR:
            return state;
        
        default:
            return state;
    }
};
