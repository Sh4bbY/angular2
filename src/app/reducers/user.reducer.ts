import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/user';

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const LOGIN_SUCCESS        = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS       = 'LOGOUT_SUCCESS';

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
        
        case LOGIN_SUCCESS:
            const userLoginData = {
                id             : payload.id,
                name           : payload.name,
                email          : payload.email,
                createdAt      : payload.createdAt,
                isAuthenticated: true,
            };
            return Object.assign({}, state, userLoginData);
        
        case REGISTRATION_SUCCESS:
            const userRegistrationData = {
                id             : payload.id,
                name           : payload.name,
                email          : payload.email,
                createdAt      : payload.createdAt,
                isAuthenticated: true,
            };
            return Object.assign({}, state, userRegistrationData);
        
        case LOGOUT_SUCCESS:
            return Object.assign({}, initialState);
        
        default:
            return state;
    }
};
