import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../common/stores/todo.store';
import { AppState } from '../common/models/appstate.model';
import { TodoItem } from '../common/models/todoitem.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-todolist',
    template: `<h1>Todo List!</h1>
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
    </ul>`,
})
export class TodoListComponent implements OnInit {
    todos: Observable<Array<TodoItem>>;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    
    constructor(private store: Store<AppState>) {
    }
    
    ngOnInit() {
        this.todos = this.store.select('todos');
    }
    
    addItem() {
        const newTodoInputEl = this.newTodoInput.nativeElement;
        this.store.dispatch({ type: ADD_TODO, payload: { title: newTodoInputEl.value } });
        newTodoInputEl.value = '';
        newTodoInputEl.focus();
    }
    
    updateItem(item: TodoItem) {
        this.store.dispatch({ type: UPDATE_TODO, payload: item });
    }
    
    removeItem(item: TodoItem) {
        this.store.dispatch({ type: REMOVE_TODO, payload: item });
    }
}
