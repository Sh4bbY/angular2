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

        .todo-title {
            display    : inline-block;
            word-break : break-all;
        }

        .custom-card-header {
            display : flex;
        }

        md-card {
            margin-bottom : 15px;
        }
    ` ],
    template: `
        <div class="col-xlg-3 col-lg-3  col-md-6 col-sm-6 col-12">
            <md-card>
                <div class="custom-card-header">
                    <h2 *ngIf="!isUpdateActive" class="todo-title" (click)="isUpdateActive=true">
                        {{list.title}}
                    </h2>
                    <form *ngIf="isUpdateActive" (ngSubmit)="updateListTitle()" class="fill-space">
                        <md-input-container class="full-width">
                            <input #listTitleInput name="title" mdInput placeholder="List Title"
                                   [value]="list.title" autocomplete="off">
                        </md-input-container>
                    </form>
                    <div *ngIf="!isUpdateActive" class="fill-space"></div>
                    <button md-icon-button [mdMenuTriggerFor]="menu">
                        <md-icon>more_vert</md-icon>
                    </button>
                    <md-menu #menu>
                        <button md-menu-item (click)="removeList()">
                            <md-icon>delete</md-icon>
                            <span>Delete</span>
                        </button>
                    </md-menu>
                </div>
                <md-card-content>
                    <form (ngSubmit)="addItem()">
                        <md-input-container class="full-width">
                            <input #newTodoInput name="title" mdInput placeholder="Add a new item" autocomplete="off">
                        </md-input-container>
                    </form>
                    <ul style="min-width: 300px">
                        <li *ngFor="let item of list.items">
                            <my-todo-item [item]="item"
                                          (remove)="removeItem($event)"
                                          (update)="updateItem($event)"
                                          (toggle)="toggleItem($event)"></my-todo-item>
                        </li>
                    </ul>
                </md-card-content>
            </md-card>
        </div>
    `,
})
export class TodoListComponent {
    @Input() list: ITodoList;
    @ViewChild('newTodoInput') newTodoInput: ElementRef;
    @ViewChild('listTitleInput') listTitleInput: ElementRef;
             isUpdateActive = false;
    
    constructor(private todoService: TodoService) {
    }
    
    removeList() {
        this.todoService.removeList(this.list._id).subscribe();
    }
    
    updateListTitle() {
        this.todoService.updateListTitle(this.list._id, this.listTitleInput.nativeElement.value)
            .subscribe(() => this.isUpdateActive = false);
    }
    
    addItem() {
        const newTodoInputEl = this.newTodoInput.nativeElement;
        if (newTodoInputEl.value.length <= 0) {
            return;
        }
        
        this.todoService.addItem(this.list._id, newTodoInputEl.value)
            .subscribe(() => {
                newTodoInputEl.value = '';
                newTodoInputEl.focus();
            });
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
