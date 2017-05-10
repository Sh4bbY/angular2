import { Component, HostBinding } from '@angular/core';
import { IBlogPost } from '../../interfaces/blog-post';
import { BlogService } from '../../services/blog.service';
import { routeAnimation } from '../../animations/route.animation';
import { Observable } from 'rxjs/Observable';
import { IRootState } from '../../reducers/index';
import { Store } from '@ngrx/store';

@Component({
    animations: [ routeAnimation ],
    styles    : [ `
        .actions, .created-at, .author {
            text-align : right;
        }
    ` ],
    template  : `

        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 class="st-title">Blog Administration</h1>
            </div>

            <button md-raised-button routerLink="/blog/admin/post/create">Create Post</button>
            <br/><br/>
            <md-card>
                <table class="full-width">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th class="author">Author</th>
                        <th class="created-at">Created At</th>
                        <th class="actions">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let post of posts | async">
                        <td>{{post.title}}</td>
                        <td class="author">{{post.author.name}}</td>
                        <td class="created-at">{{post.createdAt | date:'short'}}</td>
                        <td class="actions">
                            <button md-icon-button color="primary" title="Publish Post">
                                <md-icon>publish</md-icon>
                            </button>
                            <button md-icon-button color="accent" title="Edit Post"
                                    [routerLink]="['/blog/admin/post/',post._id]">
                                <md-icon>edit</md-icon>
                            </button>
                            <button md-icon-button color="warn" title="Delete Post" (click)="onDeleteClick(post._id)">
                                <md-icon>delete</md-icon>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </md-card>
        </div>
    `,
})
export class BlogAdminPage {
    @HostBinding('@routeAnimation') routeAnimation:any;
    posts: Observable<IBlogPost[]>;
    
    constructor(private store: Store<IRootState>, private blogService: BlogService) {
        this.posts = store.select(s => s.blog);
        this.blogService.fetchBlogPosts().subscribe();
    }
    
    onDeleteClick(id: string) {
        this.blogService.deleteBlogPost(id).subscribe(result => {
            this.posts = this.posts.filter((post: any) => post._id !== id);
        });
    }
}
