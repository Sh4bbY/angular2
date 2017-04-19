import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MdSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { IBlogPost } from '../interfaces/forms/blog-post';

@Injectable()
export class BlogService {
    private token: string;
    
    constructor(private http: Http,
                private snackbar: MdSnackBar,
                private authService: AuthService) {
        this.token     = sessionStorage.getItem('token');
    }
    
    fetchBlogPost() {
        return new Promise((resolve, reject) => {
            this.authService.getUser().then(user => {
                const transmitData = {
                    offset: 0,
                    limit : 20,
                };
                const params       = '?' + Object.keys(transmitData).map(key => key + '=' + transmitData[ key ]).join('&');
                this.http.get('/api/blog/posts' + params, transmitData)
                    .map(res => res.json())
                    .subscribe(
                        data => resolve(data),
                        err => reject(err),
                        () => console.log('completed fetch blog posts'),
                    );
            });
        });
    }
    
    storeBlogPost(blogItem: IBlogPost) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.token);
        this.authService.getUser().then(user => {
            const transmitData = {
                author: {
                    id   : user.id,
                    name : user.name,
                    email: user.email,
                },
                title : blogItem.title,
                body  : blogItem.body,
            };
            this.http.post('/api/blog/post', transmitData, { headers: headers })
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
