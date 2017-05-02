import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'my-blog-item',
    styles  : [ `` ],
    template: `
        <h1 *ngIf="id">Edit Blog Post</h1>
        <h1 *ngIf="!id">Create Blog Post</h1>
        <form style="display:flex;flex-direction: column">
            <md-input-container class="full-width">
                <input mdInput name="title" [(ngModel)]="model.title" placeholder="Title">
            </md-input-container>
            <md-input-container class="full-width">
                <textarea mdInput name="body" [(ngModel)]="model.body" rows="6" placeholder="Body"></textarea>
            </md-input-container>
            <div>
                <button md-raised-button type="button" color="accent" (click)="save()">Save</button>
                <button md-raised-button type="button" (click)="discard()">Discard</button>
                <button md-raised-button type="button" routerLink="/admin/blog">Back</button>
            </div>
        </form>
    `,
})
export class PostAdminComponent implements OnInit {
    public model: any;
    public id: string;
    
    constructor(private userService: UserService,
                private blogService: BlogService,
                private route: ActivatedRoute,
                private router: Router) {
        this.model = {};
    }
    
    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.id = params.id;
            if (this.id) {
                this.blogService.fetchBlogPost(this.id).subscribe(post => {
                    this.model.title = post.title;
                    this.model.body  = post.body;
                });
            }
        });
        
        this.userService.getUser().subscribe(user => {
            this.model.author       = {};
            this.model.author.id    = user.id;
            this.model.author.name  = user.name;
            this.model.author.email = user.email;
        });
    }
    
    save() {
        if (this.id) {
            this.blogService.updateBlogPost(this.id, this.model)
                .subscribe(() => this.router.navigateByUrl('/admin/blog'));
        }
        this.blogService.createBlogPost(this.model)
            .subscribe(() => this.router.navigateByUrl('/admin/blog'));
    }
    
    discard() {
        this.model = {};
    }
}
