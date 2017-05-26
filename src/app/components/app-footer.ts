import { Component, OnInit } from '@angular/core';

declare const buildConfig: any;

@Component({
    selector: 'app-footer',
    styles  : [ `
        footer {
            margin-top      : 40px;
            padding         : 12px;
            font-size       : 12px;
            background      : rgba(0, 0, 0, 0.4);
            color           : #ededed;
            display         : flex;
            justify-content : space-between;
        }

        .fa-heart {
            font-size : 13px;
            margin    : 0 5px;
            padding   : 0;
            width     : auto;
        }
    ` ],
    template: `
        <footer>
            <span class="copyright">
                crafted with <i class="fa fa-heart"></i> by shabbtech &copy; {{currentTime | date:'y' }}.
            </span>
            <span class="build-info">
                Version {{version}} - build from {{ buildTime | date:'shortDate'}} - {{ buildTime | date:'shortTime'}}
            </span>
        </footer>
    `,
})
export class AppFooterComponent implements OnInit {
    version: string;
    buildTime: Date;
    currentTime: Date;
    
    constructor() {
        this.version     = buildConfig.version;
        this.buildTime   = new Date(buildConfig.buildTime);
        this.currentTime = new Date();
    }
    
    ngOnInit() {
    }
}
