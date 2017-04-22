import { Routes } from '@angular/router';
import { HomePage } from './containers/home';
import { LoginComponent } from './containers/login';
import { TodoListComponent } from './components/todo-list';
import { RegistrationComponent } from './containers/registration';
import { UserProfilePage } from './containers/user-profile';
import { BlogItemPage } from './containers/blog/blog-item';
import { BlogIndexPage } from './containers/blog/blog-index';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'user/profile', component: UserProfilePage },
    { path: 'blog/item/:blogId', component: BlogItemPage, canActivate: [ AuthGuard ] },
    { path: 'blog', component: BlogIndexPage },
    { path: 'todo', component: TodoListComponent },
];
