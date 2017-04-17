import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TodoItem } from '../common/models/todoitem.model';

@Component({
    selector: '[my-todoitem]',
    template: `
        <md-checkbox [(ngModel)]="checked"></md-checkbox>
        <span *ngIf="!isEditMode" style="width: 200px; display: inline-block;">{{item.title}}</span>
        <md-input-container *ngIf="isEditMode">
            <input #updateInput name="title" mdInput placeholder="Title" (keydown.enter)="onUpdateClick()">
        </md-input-container>
        <button *ngIf="!isEditMode" md-icon-button color="accent" title="Edit Todo" (click)="onEditClick()">
            <md-icon>edit</md-icon>
        </button>
        <button *ngIf="isEditMode" md-icon-button color="accent" title="Update Todo" (click)="onUpdateClick()">
            <md-icon>save</md-icon>
        </button>
        <button md-icon-button color="warn" title="Remove Todo" (click)="onRemoveClick()">
            <md-icon>delete</md-icon>
        </button>`,
})
export class TodoItemComponent {
    @Output() remove: EventEmitter<TodoItem> = new EventEmitter();
    @Output() update: EventEmitter<TodoItem> = new EventEmitter();
    @Input() item: TodoItem;
    @ViewChild('updateInput') updateInput: ElementRef;
    
    checked: boolean    = false;
    isEditMode: boolean = false;
    
    
    onEditClick() {
        this.isEditMode = true;
        setTimeout(() => {
            const nativeEl = this.updateInput.nativeElement;
            nativeEl.value = this.item.title;
            nativeEl.select();
        }, 0);
    }
    
    onUpdateClick() {
        this.item.title = this.updateInput.nativeElement.value;
        this.isEditMode = false;
        this.update.emit(this.item);
    }
    
    onRemoveClick() {
        this.remove.emit(this.item);
    }
}
