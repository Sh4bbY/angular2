import { HomePage } from './containers/home';
import { LoginPage } from './containers/login';
import { TodoListComponent } from './components/todo-list';
import { RegisterPage } from './containers/register';
import { UserProfilePage } from './containers/user-profile';
import { BlogItemPage } from './containers/blog/blog-item';
import { BlogIndexPage } from './containers/blog/blog-index';

export const routes = [
   // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'user/profile/:userId', component: UserProfilePage },
    { path: 'blog/item/:blogId', component: BlogItemPage },
    { path: 'blog', component: BlogIndexPage },
    { path: 'todo', component: TodoListComponent },
];
