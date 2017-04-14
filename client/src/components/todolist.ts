import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../common/stores/todo.store';
import { AppStore } from '../common/models/appstore.model';
import { TodoItem } from '../common/models/todoitem.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-todolist',
    template: `<h1>Todo List!</h1>
    <md-input-container>
        <input mdInput [(ngModel)]="newTitle" placeholder="Title">
    </md-input-container>
    <button md-raised-button color="primary" (click)="addTodo()">add</button>
    <ul>
        <li *ngFor="let item of todos | async">
            {{item.title}}
            <button md-button color="warn" (click)="removeTodo(item)">remove</button>
            <button md-button color="accent" (click)="updateTodo(item)">update</button>
        </li>
    </ul>`,
})
export class TodoList {
    todos: Observable<Array<TodoItem>>;
    newTitle: string;
    
    constructor(private store: Store<AppStore>) {
        this.todos = store.select('todos');
    }
    
    addTodo(title: string) {
        const todo = { title: this.newTitle };
        this.store.dispatch({ type: ADD_TODO, payload: todo });
    }
    
    removeTodo(item: TodoItem) {
        this.store.dispatch({ type: REMOVE_TODO, payload: item });
    }
    
    updateTodo(item: TodoItem) {
        item.title = 'updated';
        this.store.dispatch({ type: UPDATE_TODO, payload: item });
    }
}
