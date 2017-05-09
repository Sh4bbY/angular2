import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routeAnimation } from '../../animations/route.animation';
import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
//import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'jquery';

@Component({
    animations: [ routeAnimation ],
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .fr-toolbar{
            background: rgba(255,255,255,0.5);
        }
        
        .fr-box.fr-basic .fr-wrapper {
            background: rgba(255,255,255,0.9);
        }
    `],
    template  : `
        <div class="col-sm-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
            <div class="st-content-top clearfix">
                <h1 *ngIf="id" class="st-title">Edit Blog Post</h1>
                <h1 *ngIf="!id" class="st-title">Create Blog Post</h1>
            </div>
            <md-card>
                <form style="display:flex;flex-direction: column">
                    <md-input-container class="full-width">
                        <input mdInput name="title" [(ngModel)]="model.title" placeholder="Title">
                    </md-input-container>
                    <div [froalaEditor] [(froalaModel)]="model.body"></div>
                    <br/>
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
    @HostBinding('@routeAnimation') routeAnimation: any;
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
