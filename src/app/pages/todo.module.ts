import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule,
    MdMenuModule,
} from '@angular/material';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from '../components/todo-item';
import { TodoListComponent } from '../components/todo-list';
import { TodoPage } from './todo.page';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdMenuModule,
        MdCheckboxModule,
        MdIconModule,
        RouterModule.forChild([ { path: '', component: TodoPage } ]),
    ],
    providers: [
        TodoService,
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        TodoPage,
    ],
})
export class TodoModule {
}
