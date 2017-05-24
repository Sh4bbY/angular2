import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/user';

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const LOGIN_SUCCESS        = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS       = 'LOGOUT_SUCCESS';
export const UNAUTHENTICATED      = 'UNAUTHENTICATED';

const initialState: IUser = {
    id             : '',
    name           : 'Guest',
    email          : '',
    isAuthenticated: false,
    isVerified     : false,
    createdAt      : null,
    roles          : [ 'guest' ],
    isAuthPending  : true,
};

export const userReducer = (state: IUser = initialState, { type, payload }: Action): IUser => {
    switch (type) {
        
        case UNAUTHENTICATED:
            return Object.assign({}, state, { isAuthPending: false });
        
        case LOGIN_SUCCESS:
            const userLoginData = {
                id             : payload.id,
                name           : payload.name,
                email          : payload.email,
                createdAt      : payload.createdAt,
                isAuthenticated: true,
                isAuthPending  : false,
            };
            return Object.assign({}, state, userLoginData);
        
        case REGISTRATION_SUCCESS:
            const userRegistrationData = {
                id             : payload.id,
                name           : payload.name,
                email          : payload.email,
                createdAt      : payload.createdAt,
                isAuthenticated: true,
                isAuthPending  : false,
            };
            return Object.assign({}, state, userRegistrationData);
        
        case LOGOUT_SUCCESS:
            return Object.assign({}, initialState, { isAuthPending: false });
        
        default:
            return state;
    }
};
