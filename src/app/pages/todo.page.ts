import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../services/todo.service';
import { ITodoList } from '../interfaces/todo-list';
import { routeAnimation } from '../animations/route.animation';

@Component({
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles    : [ `
        ul {
            padding    : 0;
            list-style : none;
        }

        .todo-head {
            display        : flex;
            flex-direction : row;
            align-items    : center;
        }
    ` ],
    template  : `
        <div class="st-content-top clearfix">
            <h1 class="st-title">Todo</h1>
            <ul class="breadcrumb">
                <li class="breadcrumb-item">
                    <a routerLink="/">Home</a>
                </li>
                <li class="breadcrumb-item active">Todo</li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-12">
                <div class="todo-head">
                    <form (ngSubmit)="addList()" class="full-width">
                        <md-input-container class="full-width">
                            <input #newListInput name="title" mdInput placeholder="Todo-List Name" autocomplete="off">
                        </md-input-container>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <my-todo-list *ngFor="let list of lists | async" [list]="list"></my-todo-list>
        </div>
    `,
})
export class TodoPage {
    lists: Observable<ITodoList[]>;
    @ViewChild('newListInput') newListInput: ElementRef;
    
    constructor(private store: Store<IRootState>, private todoService: TodoService) {
        this.lists = this.store.select('todo');
        this.todoService.fetchLists().subscribe();
    }
    
    addList() {
        const newListInputEl = this.newListInput.nativeElement;
        
        if (newListInputEl.value.length === 0) {
            return;
        }
        
        this.todoService.addList(newListInputEl.value).subscribe(
            () => {
                newListInputEl.value = '';
                newListInputEl.focus();
            },
        );
    }
}
