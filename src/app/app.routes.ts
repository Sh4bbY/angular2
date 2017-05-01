import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './containers/home';
import { LoginComponent } from './containers/login';
import { RegistrationComponent } from './containers/registration';
import { UserProfileComponent } from './containers/user/profile';
import { PostAdminComponent } from './containers/blog/post.admin';
import { BlogComponent } from './containers/blog/blog';
import { BlogAdminComponent } from './containers/blog/blog.admin';
import { ChatComponent } from './components/chat';
import { TodoComponent } from './components/todo';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'user/profile', component: UserProfileComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'admin/blog', component: BlogAdminComponent, canActivate: [ AuthGuard ] },
    { path: 'admin/blog/post/create', component: PostAdminComponent, canActivate: [ AuthGuard ] },
    { path: 'admin/blog/post/:id', component: PostAdminComponent, canActivate: [ AuthGuard ] },
    
    { path: 'todo', component: TodoComponent },
    { path: 'chat', component: ChatComponent },
];
