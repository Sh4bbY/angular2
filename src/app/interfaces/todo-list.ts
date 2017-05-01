import { ITodoItem } from './todo-item';

export interface ITodoList {
    _id: string;
    title: string;
    items: ITodoItem[];
}
