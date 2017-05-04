import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ITodoItem } from '../interfaces/todo-item';
import { TodoService } from '../services/todo.service';
import { ITodoList } from '../interfaces/todo-list';

@Component({
    selector: 'my-todo-list',
    styles  : [ `
        ul {
            padding    : 0;
            list-style : none;
        }

        md-card-header {
            display        : flex;
            flex-direction : row;
            align-items    : center;
        }

        md-card {
            margin-bottom : 15px;
        }
    ` ],
    template: `
        <div class="col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <md-card-header>
                    <h2 class="fill-space">{{list.title}}</h2>
                    <button md-mini-fab (click)="removeList()" title="remove todo-list">
                        <md-icon>delete</md-icon>
                    </button>
                </md-card-header>
                <form (ngSubmit)="addItem()">
                    <md-input-container>
                        <input #newTodoInput name="title" mdInput placeholder="Todo-Text">
                    </md-input-container>
                    <button md-raised-button color="primary">add</button>
                </form>
                <ul style="min-width: 300px">
                    <li *ngFor="let item of list.items">
                        <my-todo-item [item]="item"
                                      (remove)="removeItem($event)"
                                      (update)="updateItem($event)"
                                      (toggle)="toggleItem($event)"></my-todo-item>
                    </li>
                </ul>
            </md-card>
        </div>
    `,
})
export class TodoListComponent {
    @Input() list: ITodoList;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    
    constructor(private todoService: TodoService) {
    }
    
    removeList() {
        this.todoService.removeList(this.list._id).subscribe();
    }
    
    addItem() {
        const newTodoInputEl = this.newTodoInput.nativeElement;
        if (newTodoInputEl.value.length <= 0) {
            return;
        }
        
        this.todoService.addItem(this.list._id, newTodoInputEl.value).subscribe();
        
        newTodoInputEl.value = '';
        newTodoInputEl.focus();
    }
    
    updateItem(item: ITodoItem) {
        this.todoService.updateItem(this.list._id, item._id, item.text).subscribe();
    }
    
    removeItem(item: ITodoItem) {
        this.todoService.removeItem(this.list._id, item._id).subscribe();
    }
    
    toggleItem(item: ITodoItem) {
        this.todoService.toggleItem(this.list._id, item._id).subscribe();
    }
}
