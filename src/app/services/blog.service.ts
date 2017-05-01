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
    }
    
    fetchBlogPosts() {
        const options = {
            offset: 0,
            limit : 10,
        };
        
        const params = '?' + Object.keys(options)
                .map(key => key + '=' + options[ key ])
                .join('&');
        
        return this.http.get('/api/blog/posts' + params)
            .map(res => res.json());
    }
    
    fetchBlogPost(id: string) {
        return this.http.get('/api/blog/post/' + id)
            .map(res => res.json());
    }
    
    
    updateBlogPost(id: string, body: IBlogPost) {
        return this.http.put('/api/blog/post/' + id, body)
            .map(res => res.json());
    }
    
    deleteBlogPost(id: string) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.delete('/api/blog/post/' + id, options)
            .map(res => res.json());
    }
    
    createBlogPost(blogItem: IBlogPost) {
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
