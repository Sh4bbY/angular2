import { Component, HostBinding } from '@angular/core';
import { IBlogPost } from '../../interfaces/blog-post';
import { BlogService } from '../../services/blog.service';
import { routeAnimation } from '../../animations/route.animation';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IRootState } from '../../reducers/index';

@Component({
    animations: [ routeAnimation ],
    styles    : [ `
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
            font-size     : 16px;
        }
    ` ],
    template  : `
        <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
                <div class="st-content-top clearfix">
                    <h1 class="st-title">Blog</h1>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a routerLink="/home">Home</a>
                        </li>
                        <li class="breadcrumb-item active">Blog</li>
                    </ul>
                </div>
                <button md-raised-button routerLink="/blog/admin">Blog Administration</button>
                <br/><br/>
                <md-card *ngFor="let post of posts | async">
                    <md-card-header>
                        <div md-card-avatar class="example-header-image"></div>
                        <md-card-title><h3>{{post.title}}</h3></md-card-title>
                        <md-card-subtitle>
                            created by
                            <a routerLink="/user/profile/{{post.author.id}}">{{post.author.name}}</a>
                            at {{post.createdAt | date:'fullDate'}} at {{post.createdAt | date:'shortTime'}}
                        </md-card-subtitle>
                    </md-card-header>
                    <hr/>
                    <md-card-content [innerHTML]="post.body">
                    </md-card-content>
                </md-card>
            </div>
        </div>
    `,
})
export class BlogPage {
    @HostBinding('@routeAnimation') routeAnimation: any;
                                    posts: Observable<IBlogPost[]>;
    
    constructor(private store: Store<IRootState>, private blogService: BlogService) {
        this.posts = store.select(s => s.blog);
        this.blogService.fetchBlogPosts().subscribe();
    }
}
