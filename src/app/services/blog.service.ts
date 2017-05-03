import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IBlogPost } from '../interfaces/blog-post';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { IRootState } from '../reducers/index';
import { Store } from '@ngrx/store';
import { CREATE_BLOG_POST, DELETE_BLOG_POST, LOAD_BLOG_POSTS, UPDATE_BLOG_POST } from '../reducers/blog.reducer';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class BlogService {
    
    constructor(private http: Http,
                private store: Store<IRootState>,
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
            .map(res => this.store.dispatch({ type: LOAD_BLOG_POSTS, payload: res.json() }));
    }
    
    fetchBlogPost(id: string) {
        return this.http.get('/api/blog/post/' + id)
            .map(res => res.json());
    }
    
    
    updateBlogPost(id: string, post: IBlogPost) {
        return this.http.put('/api/blog/post/' + id, post)
            .map(res => this.store.dispatch({ type: UPDATE_BLOG_POST, payload: res.json() }));
    }
    
    deleteBlogPost(id: string) {
        const headers = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.delete('/api/blog/post/' + id, options)
            .map(res => this.store.dispatch({ type: DELETE_BLOG_POST, payload: res.json() }));
    }
    
    createBlogPost(blogItem: IBlogPost) {
        const headers      = new Headers({ Authorization: 'Bearer ' + this.authenticationService.token });
        const options      = new RequestOptions({ headers: headers });
        const transmitData = {
            author: {},
            title : blogItem.title,
            body  : blogItem.body,
        };
        
        return this.userService.getUser()
            .flatMap(user => {
                transmitData.author = {
                    id   : user.id,
                    name : user.name,
                    email: user.email,
                };
                return this.http.post('/api/blog/post', transmitData, options);
            })
            .map(res => this.store.dispatch({ type: CREATE_BLOG_POST, payload: res.json() }));
    }
}
