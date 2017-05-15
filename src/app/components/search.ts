import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { expandAnimation } from '../animations/expand.animation';
import 'rxjs';


@Component({
    selector  : 'my-search',
    animations: [ expandAnimation ],
    template  : `
        <md-input-container class="search" (click)="$event.stopPropagation()">
            <md-icon>search</md-icon>
            <input #searchInput mdInput name="name" [(ngModel)]="search" placeholder="Search for.."
                   autocomplete="off">
            <ul class="search-results" *ngIf="isActive" @expandAnimation>
                <li *ngFor="let result of results">
                    <a href="/search/result/{{result.id}}" title="{{result.text}}">{{result.text}}</a>
                </li>
            </ul>
        </md-input-container>
    `,
})
export class SearchComponent implements OnInit, OnDestroy {
    @ViewChild('searchInput') searchInput: ElementRef;
    
    results: any[] = [];
    search         = '';
    isActive       = false;
    
    constructor(private http: Http) {
    }
    
    ngOnInit() {
        Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
            .debounceTime(200)
            .subscribe(() => {
                this.http.get('/api/tweets/ethereumproject?search=' + this.search)
                    .subscribe(res => {
                        const results = res.json();
                        this.results  = results;
                        this.isActive = results.length > 0;
                    });
            });
        
        Observable.fromEvent(document, 'click')
            .skipWhile(() => !this.isActive)
            .subscribe((event) => {
                this.isActive = false;
            });
    }
    
    ngOnDestroy() {
    
    }
}
