import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
const highlightjs = require('highlightjs');

marked.setOptions({
    highlight: function (code) {
        return highlightjs.highlightAuto(code).value;
    },
});

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
    transform(value: string): string {
        return marked(value);
    }
}
