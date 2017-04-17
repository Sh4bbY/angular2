import { HomePage } from './app/pages/home.page';
import { LoginPage } from './app/pages/login.page';
import { TodoListComponent } from './app/components/todolist';
import { RegisterPage } from './app/pages/register.page';
import { UserSettingsPage } from './app/pages/user.settings.page';

export const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'user/settings', component: UserSettingsPage },
    { path: 'todo', component: TodoListComponent },
];
