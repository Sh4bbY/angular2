import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from '@angular/material';
import { PostAdminPage } from '../pages/blog/post.admin.page';
import { BlogAdminPage } from '../pages/blog/blog.admin.page';
import { BlogPage } from '../pages/blog/blog.page';
import { RichTextEditorModule } from './rich-text-editor.module';
import { AuthGuard } from '../guards/auth.guard';

const routes: Route[] = [
    { path: '', component: BlogPage },
    { path: 'admin', component: BlogAdminPage, canActivate: [ AuthGuard ] },
    { path: 'admin/post/create', component: PostAdminPage, canActivate: [ AuthGuard ] },
    { path: 'admin/post/:id', component: PostAdminPage, canActivate: [ AuthGuard ] },
];

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdCardModule,
        RichTextEditorModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        BlogPage,
        BlogAdminPage,
        PostAdminPage,
    ],
})
export class BlogModule {
}
