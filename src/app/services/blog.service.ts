import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MdSnackBar } from '@angular/material';
import { IBlogPost } from '../interfaces/forms/blog-post';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class BlogService {
    private token: string;
    
    constructor(private http: Http,
                private snackbar: MdSnackBar,
                private userService: UserService,
                private authenticationService: AuthenticationService) {
        this.token = sessionStorage.getItem('token');
    }
    
    fetchBlogPosts() {
        const transmitData = {
            offset: 0,
            limit : 20,
        };
        
        const params = '?' + Object.keys(transmitData)
                .map(key => key + '=' + transmitData[ key ])
                .join('&');
        
        return this.http.get('/api/blog/posts' + params, transmitData)
            .map(res => res.json());
    }
    
    storeBlogPost(blogItem: IBlogPost) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        
        this.userService.getUser().subscribe(user => {
            const transmitData = {
                author: {
                    id   : user.id,
                    name : user.name,
                    email: user.email,
                },
                title : blogItem.title,
                body  : blogItem.body,
            };
            this.http.post('/api/blog/post', transmitData, options)
                .map(res => res.json())
                .subscribe(
                    data => console.log('success handler', data),
                    this.errorHandler.bind(this),
                    () => console.log('complete handler'),
                );
        });
    }
    
    errorHandler(err: any) {
        this.snackbar.open(err._body);
    }
}
