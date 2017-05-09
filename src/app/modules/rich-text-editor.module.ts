import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

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

console.log('rich text loaded');

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
