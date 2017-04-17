import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginFormModel } from '../models/forms/login.form.model';
import { User } from '../models/user.model';
import { RegistrationFormModel } from '../models/forms/registration.form.model';
import { user, LOGIN_PENDING, LOGIN_SUCCESS, LOGOUT, USER_REGISTRATION } from '../stores/user.store';
import { Store } from '@ngrx/store';
import { AppState } from '../models/appstate.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    private userStore: Observable<User>;
    private token: string;
    
    constructor(private http: Http, private store: Store<AppState>, private router: Router) {
        this.userStore = store.select('user');
        this.token     = sessionStorage.getItem('token');
        if (!!this.token) {
            this.loginByToken();
        }
    }
    
    getUser():Promise<User> {
        return this.store.select('user').take(1).toPromise();
    }
    
    loginByToken() {
        this.http.post('/api/loginByToken', { token: this.token })
            .map((res: Response) => res.json())
            .subscribe(data => {
                const payload = AuthService.getTokenPayload(data.token);
                if (payload) {
                    sessionStorage.setItem('token', data.token);
                    this.store.dispatch({ type: LOGIN_SUCCESS, payload: payload });
                }
            });
    }
    
    login(formData: LoginFormModel) {
        this.store.dispatch({ type: LOGIN_PENDING, payload: {} });
        this.http.post('/api/login', formData)
            .map((res: Response) => res.json())
            .subscribe((data) => {
                const payload = AuthService.getTokenPayload(data.token);
                if (payload) {
                    sessionStorage.setItem('token', data.token);
                    this.store.dispatch({ type: LOGIN_SUCCESS, payload: payload });
                    this.router.navigateByUrl('/home');
                }
            });
    }
    
    logout() {
        sessionStorage.removeItem('token');
        this.store.dispatch({ type: LOGOUT, payload: {} });
    }
    
    register(formData: RegistrationFormModel) {
        this.http.post('/api/registration', formData)
            .map((res: Response) => res.json())
            .subscribe(res => {
                this.store.dispatch({ type: USER_REGISTRATION, payload: res });
            });
        //   .catch(AuthService.handleError);
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
