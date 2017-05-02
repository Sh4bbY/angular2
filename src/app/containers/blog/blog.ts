import { Component, OnInit } from '@angular/core';
import { IBlogPost } from '../../interfaces/forms/blog-post';
import { BlogService } from '../../services/blog.service';
import { fade } from '../../animations/fade.animation';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IRootState } from '../../reducers/index';

@Component({
    selector  : 'my-blog',
    animations: [ fade ],
    host      : { '[@fade]': '' },
    styles    : [ require('to-string-loader!highlightjs/styles/darkula.css'), `

        .example-header-image {
            background-image : url('/assets/img/user.png');
            background-size  : cover;
        }

        md-card-actions {
            display     : flex;
            align-items : center;
        }

        md-card {
            margin-bottom : 20px;
            font-size: 16px;
        }
    ` ],
    template  : `
        <h1>Blog Index!</h1>
        <button md-raised-button routerLink="/admin/blog/">Blog Administration</button>
        <br/><br/>
        <md-card *ngFor="let post of posts | async">
            <md-card-header>
                <div md-card-avatar class="example-header-image"></div>
                <md-card-title>{{post.title}}</md-card-title>
                <md-card-subtitle>
                    created by
                    <a routerLink="/user/profile/{{post.author.id}}">{{post.author.name}}</a>
                    at {{post.createdAt | date:'fullDate'}}
                </md-card-subtitle>
            </md-card-header>
            <hr/>
            <md-card-content [innerHTML]="post.body">
            </md-card-content>
            <md-card-actions>
                <button md-button>
                    <md-icon>thumb_up</md-icon>
                    LIKE
                </button>
                <button md-button>
                    <md-icon>share</md-icon>
                    SHARE
                </button>
                <span class="fill-space"></span>
                <span>0 likes - 0 comments</span>
            </md-card-actions>
        </md-card>
    `,
})
export class BlogComponent {
    posts: Observable<IBlogPost[]>;
    
    constructor(private store: Store<IRootState>, private blogService: BlogService) {
        this.posts = store.select(s => s.blog);
        this.blogService.fetchBlogPosts().subscribe();
    }
}
