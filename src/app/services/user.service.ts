import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IUser } from '../interfaces/user';
import { IRegistrationForm } from '../interfaces/forms/registration';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { REGISTRATION_SUCCESS } from '../reducers/user.reducer';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class UserService {
    
    constructor(private http: Http,
                private store: Store<IRootState>,
                private authenticationService: AuthenticationService) {
    }
    
    getUser(): Observable<IUser> {
        return this.store.select(s => s.user);
    }
    
    getUsers(): Observable<IUser[]> {
        // add authorization header with jwt token
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
}
