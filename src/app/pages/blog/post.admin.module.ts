import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { PostAdminPage } from './post.admin.page';
import { RichTextEditorModule } from '../../modules/rich-text-editor.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        RichTextEditorModule,
        RouterModule.forChild([ { path: '', component: PostAdminPage } ]),
    ],
    declarations: [ PostAdminPage ],
})
export class PostAdminModule {
}
