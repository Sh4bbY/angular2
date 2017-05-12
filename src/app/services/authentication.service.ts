import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTRATION_SUCCESS } from '../reducers/user.reducer';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IRegistrationForm } from '../interfaces/forms/registration';


@Injectable()
export class AuthenticationService {
    public token: string;
    
    constructor(private http: Http,
                private store: Store<IRootState>) {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token        = currentUser && currentUser.token;
        } catch (e) {
            console.log('could not parse currentUser');
        }
    }
    
    login(name: string, password: string) {
        return this.http.post('/api/login', { name, password })
            .map(processLoginResponse.bind(this));
    }
    
    loginByToken() {
        return this.http.post('/api/loginByToken', { token: this.token })
            .map(processLoginResponse.bind(this));
    }
    
    logout(): Observable<boolean> {
        const headers = new Headers({ Authorization: 'Bearer ' + this.token });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.get('/api/logout', options)
            .map(() => {
                localStorage.removeItem('currentUser');
                this.token = null;
                this.store.dispatch({ type: LOGOUT_SUCCESS, payload: {} });
                return true;
            });
    }
    
    register(formData: IRegistrationForm): Observable<any> {
        return this.http.post('/api/registration', formData)
            .map(processRegistrationResponse.bind(this));
    }
}

function processRegistrationResponse(res: Response) {
    return processTokenResponse.call(this, res, REGISTRATION_SUCCESS);
}


function processLoginResponse(res: Response) {
    return processTokenResponse.call(this, res, LOGIN_SUCCESS);
}

function processTokenResponse(res: Response, event: string) {
    const token        = res.json() && res.json().token;
    const tokenPayload = getTokenPayload(token);
    
    if (token && tokenPayload) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ name: tokenPayload.name, token }));
        this.store.dispatch({ type: event, payload: tokenPayload });
        return true;
    }
    return false;
}

function getTokenPayload(token: string): any {
    try {
        const encodedPayload = token.split('.')[ 1 ];
        return JSON.parse(atob(encodedPayload));
    } catch (err) {
        return null;
    }
}
