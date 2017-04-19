import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../reducers/todo.reducer';
import { RootState } from '../reducers/index';
import { ITodoItem } from '../interfaces/todo-item';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-todolist',
    styles  : [ `
        .todolist {
            padding : 15px;
        }

        .todolist ul {
            padding    : 0;
            list-style : none;
        }
    ` ],
    template: `
        <div class="todolist">
            <h1>Todo List!</h1>
            <form (ngSubmit)="addItem()">
                <md-input-container>
                    <input #newTodoInput name="title" mdInput placeholder="Title">
                </md-input-container>
                <button md-raised-button color="primary">add</button>
            </form>
            <ul style="min-width: 300px">
                <li my-todoitem *ngFor="let todo of todos | async"
                    [item]="todo"
                    (remove)="removeItem($event)"
                    (update)="updateItem($event)"></li>
            </ul>
        </div>`,
})
export class TodoListComponent implements OnInit {
    todos: Observable<Array<ITodoItem>>;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    
    constructor(private store: Store<RootState>) {
    }
    
    ngOnInit() {
        this.todos = this.store.select('todo');
    }
    
    addItem() {
        const newTodoInputEl = this.newTodoInput.nativeElement;
        this.store.dispatch({ type: ADD_TODO, payload: { title: newTodoInputEl.value } });
        newTodoInputEl.value = '';
        newTodoInputEl.focus();
    }
    
    updateItem(item: ITodoItem) {
        this.store.dispatch({ type: UPDATE_TODO, payload: item });
    }
    
    removeItem(item: ITodoItem) {
        this.store.dispatch({ type: REMOVE_TODO, payload: item });
    }
}
