import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../common/stores/todo.store';
import { AppStore } from '../common/models/appstore.model';
import { TodoItem } from '../common/models/todoitem.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-todolist',
    template: `<h1>Todo List!</h1>
    <button (click)="addTodo()">add</button>
    <button (click)="removeTodo()">remove</button>
    <button (click)="updateTodo()">update</button>
    <ul>
        <li *ngFor="let item of todos | async">item: {{item.title}}</li>
    </ul>`,
})
export class TodoList {
    todos: Observable<Array<TodoItem>>;
    
    constructor(private store: Store<AppStore>) {
        this.todos = store.select('todos');
    }
    
    addTodo() {
        const todo = { title: 'test' };
        this.store.dispatch({ type: ADD_TODO, payload: todo });
    }
    
    removeTodo(id: number) {
        this.store.dispatch({ type: REMOVE_TODO, payload: { title: 'test' } });
    }
    
    updateTodo() {
        this.store.dispatch({ type: UPDATE_TODO, payload: { title: 'test23' } });
    }
}
