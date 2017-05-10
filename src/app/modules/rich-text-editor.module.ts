import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/css/froala_editor.min.css';

import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/css/plugins/code_view.min.css';

import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/css/plugins/table.min.css';

import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/css/plugins/colors.min.css';

import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/css/plugins/file.min.css';

import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/css/plugins/quick_insert.min.css';

import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/css/plugins/char_counter.min.css';

import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/url.min.js';

import 'jquery';

@NgModule({
    imports: [
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
    ],
    exports: [
        FroalaEditorModule,
        FroalaViewModule,
    ],
})
export class RichTextEditorModule {
}
