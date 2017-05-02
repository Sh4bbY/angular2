import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from './authentication.service';
import { IFeedbackForm } from '../interfaces/forms/feedback';

@Injectable()
export class FeedbackService {
    
    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
    }
    
    fetchFeedback() {
        const options = {
            offset: 0,
            limit : 10,
        };
        
        const params = '?' + Object.keys(options)
                .map(key => key + '=' + options[ key ])
                .join('&');
        
        return this.http.get('/api/feedback' + params)
            .map(res => res.json());
    }
    
    get(id?: string) {
        return this.http.get('/api/feedback/' + id)
            .map(res => res.json());
    }
    
    create(feedback: IFeedbackForm) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        
        const body = {
            author : feedback.author.name,
            email  : feedback.author.email,
            type   : feedback.type,
            topic  : feedback.topic,
            message: feedback.message,
        };
        
        return this.http.post('/api/feedback', body, options)
            .map(res => res.json());
    }
}
