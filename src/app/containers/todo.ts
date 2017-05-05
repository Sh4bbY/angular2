import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../reducers/index';
import { Observable } from 'rxjs/Observable';
import { TodoService } from '../services/todo.service';
import { ITodoList } from '../interfaces/todo-list';
import { routeAnimation } from '../animations/route.animation';

@Component({
    selector: 'my-todo',
    animations: [ routeAnimation ],
    host      : { '[@routeAnimation]': '' },
    styles  : [ `
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
    template: `
        <div class="todo-head">
            <h1 class="fill-space">Todo List!</h1>
            <button md-fab title="add todo-list" (click)="addList()">
                <md-icon>add</md-icon>
            </button>
        </div>
        <my-todo-list *ngFor="let list of lists | async" [list]="list"></my-todo-list>
    `,
})
export class TodoComponent {
    lists: Observable<ITodoList[]>;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    
    constructor(private store: Store<IRootState>, private todoService: TodoService) {
        this.lists = this.store.select('todo');
        this.todoService.fetchLists().subscribe();
    }
    
    addList() {
        this.todoService.addList('My DummyList').subscribe();
    }
}
