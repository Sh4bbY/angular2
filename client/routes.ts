import { HomePage } from './src/pages/home.page';
import { LoginPage } from './src/pages/login.page';
import { TodoList } from './src/components/todolist';

export const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'todo', component: TodoList },
];
