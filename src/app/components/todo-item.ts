import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ITodoItem } from '../interfaces/todo-item';

@Component({
    selector: 'my-todo-item',
    styles  : [ `
        .todo-item {
            display : flex;
        }
    ` ],
    template: `
        <div class="todo-item">
            <md-checkbox (click)="toggle.emit(item)" [(ngModel)]="item.complete" title="Toggle Todo"></md-checkbox>
            <span *ngIf="!isEditMode" class="fill-space">{{item.text}}</span>
            <md-input-container *ngIf="isEditMode" class="fill-space">
                <input #updateInput mdInput placeholder="Todo-Text" (keydown.enter)="onUpdateClick()"
                       autocomplete="off">
            </md-input-container>
            <button *ngIf="!isEditMode" md-icon-button color="accent" title="Edit Todo" (click)="onEditClick()">
                <md-icon>edit</md-icon>
            </button>
            <button *ngIf="isEditMode" md-icon-button color="accent" title="Update Todo" (click)="onUpdateClick()">
                <md-icon>save</md-icon>
            </button>
            <button *ngIf="isEditMode" md-icon-button color="warn" title="Cancel Update" (click)="isEditMode=false">
                <md-icon>cancel</md-icon>
            </button>
            <button *ngIf="!isEditMode" md-icon-button color="warn" title="Remove Todo" (click)="remove.emit(item)">
                <md-icon>delete</md-icon>
            </button>
        </div>`,
})
export class TodoItemComponent {
    @Output() remove: EventEmitter<ITodoItem> = new EventEmitter();
    @Output() update: EventEmitter<ITodoItem> = new EventEmitter();
    @Output() toggle: EventEmitter<ITodoItem> = new EventEmitter();
    @Input() item: ITodoItem;
    @ViewChild('updateInput') updateInput: ElementRef;
    
    isEditMode: boolean = false;
    
    onEditClick() {
        this.isEditMode = true;
        setTimeout(() => {
            const nativeEl = this.updateInput.nativeElement;
            nativeEl.value = this.item.text;
            nativeEl.select();
        }, 0);
    }
    
    onUpdateClick() {
        const updatedText     = this.updateInput.nativeElement.value;
        const item: ITodoItem = Object.assign({}, this.item, { text: updatedText });
        this.update.emit(item);
    }
}
