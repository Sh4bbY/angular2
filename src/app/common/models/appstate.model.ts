import { TodoItem } from './todoitem.model';
import { User } from './user.model';

export interface AppState {
    todos : Array<TodoItem>,
    user: User
}
