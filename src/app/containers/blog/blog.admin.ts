import { Component, OnInit } from '@angular/core';
import { IBlogPost } from '../../interfaces/forms/blog-post';
import { BlogService } from '../../services/blog.service';
import { fade } from '../../animations/fade.animation';

@Component({
    selector  : 'my-admin-blog-index',
    animations: [ fade ],
    host      : { '[@fade]': '' },
    styles    : [ `
        .actions, .created-at, .author {
            text-align : right;
        }
    ` ],
    template  : `
        <h1>Blog Administration</h1>
        <button md-raised-button routerLink="/admin/blog/post/create">Create Post</button>
        <br/><br/>
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
            <tr *ngFor="let post of posts">
                <td>{{post.title}}</td>
                <td class="author">{{post.author.name}}</td>
                <td class="created-at">{{post.createdAt | date:'short'}}</td>
                <td class="actions">
                    <button md-icon-button color="primary" title="Publish Post">
                        <md-icon>publish</md-icon>
                    </button>
                    <button md-icon-button color="accent" title="Edit Post"
                            [routerLink]="['/admin/blog/post/',post._id]">
                        <md-icon>edit</md-icon>
                    </button>
                    <button md-icon-button color="warn" title="Delete Post" (click)="onDeleteClick(post._id)">
                        <md-icon>delete</md-icon>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    `,
})
export class BlogAdminComponent implements OnInit {
    posts: IBlogPost[];
    
    constructor(private blogService: BlogService) {
        this.posts = [];
    }
    
    ngOnInit() {
        this.blogService.fetchBlogPosts().subscribe((posts: any[]) => {
            this.posts = posts;
        });
    }
    
    onDeleteClick(id: string) {
        this.blogService.deleteBlogPost(id).subscribe(result => {
            console.log(`item ${id} deleted`, result);
            this.posts = this.posts.filter((post:any) => post._id !== id);
        });
    }
}
