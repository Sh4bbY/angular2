import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from '../reducers/todo.reducer';
import { IRootState } from '../reducers/index';
import { ITodoItem } from '../interfaces/todo-item';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-todolist',
    styles  : [ `
        ul {
            padding    : 0;
            list-style : none;
        }
    ` ],
    template: `
        <h1>Todo List!</h1>
        <form (ngSubmit)="addItem()">
            <md-input-container>
                <input #newTodoInput name="title" mdInput placeholder="Todo-Text">
            </md-input-container>
            <button md-raised-button color="primary">add</button>
        </form>
        <ul style="min-width: 300px">
            <li *ngFor="let todo of todos | async">
                <my-todo-item [item]="todo"
                              (remove)="removeItem($event)"
                              (update)="updateItem($event)"
                              (toggle)="toggleItem($event)"></my-todo-item>
            </li>
        </ul>`,
})
export class TodoListComponent implements OnInit {
    todos: Observable<ITodoItem[]>;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    
    constructor(private store: Store<IRootState>) {
    }
    
    ngOnInit() {
        this.todos = this.store.select('todo');
    }
    
    addItem() {
        const newTodoInputEl = this.newTodoInput.nativeElement;
        if (newTodoInputEl.value.length <= 0) {
            return;
        }
        this.store.dispatch({ type: ADD_TODO, payload: { text: newTodoInputEl.value } });
        newTodoInputEl.value = '';
        newTodoInputEl.focus();
    }
    
    updateItem(item: ITodoItem) {
        this.store.dispatch({ type: UPDATE_TODO, payload: item });
    }
    
    removeItem(item: ITodoItem) {
        this.store.dispatch({ type: REMOVE_TODO, payload: item });
    }
    
    toggleItem(item: ITodoItem) {
        this.store.dispatch({ type: TOGGLE_TODO, payload: item });
    }
}
