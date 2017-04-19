import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ILoginForm } from '../interfaces/forms/login';
import { IUser } from '../interfaces/user';
import { IRegistrationForm } from '../interfaces/forms/registration';
import { Store } from '@ngrx/store';
import { RootState } from '../reducers/index';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import {
    userReducer,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_REGISTRATION,
    LOGIN_ERROR,
} from '../reducers/user.reducer';

@Injectable()
export class AuthService {
    private userStore: Observable<IUser>;
    private token: string;
    
    constructor(private http: Http,
                private store: Store<RootState>,
                private router: Router,
                private snackbar: MdSnackBar) {
        this.userStore = store.select('userReducer');
        this.token     = sessionStorage.getItem('token');
        if (!!this.token) {
            this.loginByToken();
        }
    }
    
    getUser(): Promise<IUser> {
        return this.store.select('user').take(1).toPromise();
    }
    
    loginByToken() {
        this.http.post('/api/loginByToken', { token: this.token })
            .map((res: Response) => res.json())
            .subscribe(data => {
                    console.log('I was called with:', data);
                    const payload = AuthService.getTokenPayload(data.token);
                    if (payload) {
                        sessionStorage.setItem('token', data.token);
                        this.store.dispatch({ type: LOGIN_SUCCESS, payload: payload });
                    }
                },
                this.loginErrorHandler.bind(this));
    }
    
    login(formData: ILoginForm) {
        this.store.dispatch({ type: LOGIN_PENDING, payload: {} });
        
        this.http.post('/api/login', formData)
            .map((res: Response) => res.json())
            .subscribe(
                this.loginSuccessHandler.bind(this),
                this.loginErrorHandler.bind(this),
                () => this.router.navigateByUrl('/home'));
    }
    
    logout() {
        sessionStorage.removeItem('token');
        this.store.dispatch({ type: LOGOUT, payload: {} });
    }
    
    register(formData: IRegistrationForm) {
        this.http.post('/api/registration', formData)
            .map((res: Response) => res.json())
            .subscribe(
                res => this.store.dispatch({ type: USER_REGISTRATION, payload: res }),
                this.RegisterErrorHandler.bind(this),
                () => this.router.navigateByUrl('/home'));
    }
    
    private loginSuccessHandler(data: any) {
        const payload = AuthService.getTokenPayload(data.token);
        if (payload) {
            sessionStorage.setItem('token', data.token);
            this.store.dispatch({ type: LOGIN_SUCCESS, payload: payload });
        }
    }
    
    private loginErrorHandler(errResponse: any) {
        this.showErrorMessage(errResponse._body);
        this.store.dispatch({ type: LOGIN_ERROR, payload: {} });
    }
    
    private RegisterErrorHandler(errResponse: any) {
        this.showErrorMessage(errResponse._body);
    }
    
    private showErrorMessage(message: string) {
        this.snackbar.open(message, 'X', {
            duration: 4000,
        });
    }
    
    private static getTokenPayload(token: string): any {
        try {
            const encodedPayload = token.split('.')[ 1 ];
            return JSON.parse(atob(encodedPayload));
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
