import { Component, OnInit } from '@angular/core';
import { IBlogPost } from '../../interfaces/forms/blog-post';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'my-blog-index',
    styles  : [ require('to-string-loader!highlightjs/styles/darkula.css'), `

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
        }
    ` ],
    template: `
        <h1>Blog Index!</h1>
        <button md-raised-button routerLink="/blog/item/1">Create Post</button>
        <br/><br/>
        <md-card *ngFor="let post of posts">
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
            <md-card-content [innerHTML]="post.body | markdown">
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
export class BlogIndexPage implements OnInit {
    posts: IBlogPost[];
    
    constructor(private blogService: BlogService) {
        this.posts = [];
    }
    
    ngOnInit() {
        this.blogService.fetchBlogPosts().subscribe((posts: any[]) => {
            this.posts = posts;
        });
    }
}
