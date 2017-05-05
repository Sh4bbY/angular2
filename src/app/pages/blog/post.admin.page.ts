import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routeAnimation } from '../../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    template  : `
        <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <div class="st-content-top clearfix">
                <h1 *ngIf="id" class="st-title">Edit Blog Post</h1>
                <h1 *ngIf="!id" class="st-title">Create Blog Post</h1>
            </div>
            <md-card>
                <form style="display:flex;flex-direction: column">
                    <md-input-container class="full-width">
                        <input mdInput name="title" [(ngModel)]="model.title" placeholder="Title">
                    </md-input-container>
                    <md-input-container class="full-width">
                        <textarea mdInput name="body" [(ngModel)]="model.body" rows="6" placeholder="Body"></textarea>
                    </md-input-container>
                    <div>
                        <button md-raised-button type="button" color="accent" (click)="save()" title="Save">
                            Save
                        </button>
                        <button md-raised-button type="button" (click)="discard()" title="Discard">Discard</button>
                        <button md-raised-button type="button" routerLink="/admin/blog" title="Back">Back</button>
                    </div>
                </form>
            </md-card>
        </div>
    `,
})
export class PostAdminPage implements OnInit {
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
