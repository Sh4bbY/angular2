import { Component, OnInit } from '@angular/core';
import { IBlogPost } from '../../interfaces/forms/blog-post';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';

@Component({
    selector: 'my-blog-item',
    styles  : [ `` ],
    template: `
        <h1>Blog Item!</h1>
        <form style="display:flex;flex-direction: column">
            <md-input-container class="full-width">
                <input mdInput name="title" [(ngModel)]="formData.title" placeholder="Title">
            </md-input-container>
            <md-input-container class="full-width">
                <textarea mdInput name="body" [(ngModel)]="formData.body" placeholder="Body"></textarea>
            </md-input-container>
            <button md-raised-button color="primary" (click)="publish()">Publish</button>
            <button md-raised-button color="accent" (click)="save()">Save</button>
            <button md-raised-button (click)="discard()">Discard</button>
        </form>
    
    `,
})
export class BlogItemPage implements OnInit {
    public formData: IBlogPost;
    private initialState: IBlogPost = {
        author     : {
            name : '',
            email: '',
            id   : '',
        },
        title      : '',
        body       : '',
        createdAt  : null,
        publishedAt: null,
        visibleFor : [],
        comments   : [],
    };
    
    constructor(private userService: UserService, private blogService: BlogService) {
        this.formData = Object.assign({}, this.initialState);
    }
    
    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            this.formData.author.id    = user.id;
            this.formData.author.name  = user.name;
            this.formData.author.email = user.email;
        });
    }
    
    publish() {
    
    }
    
    save() {
        this.blogService.storeBlogPost(this.formData);
    }
    
    discard() {
        this.formData = Object.assign({}, this.initialState);
    }
}
