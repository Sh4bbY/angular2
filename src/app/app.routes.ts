import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { RegistrationPage } from './pages/registration.page';
import { UserProfilePage } from './pages/user/profile.page';
import { PostAdminPage } from './pages/blog/post.admin.page';
import { BlogPage } from './pages/blog/blog.page';
import { BlogAdminPage } from './pages/blog/blog.admin.page';
import { TodoPage } from './pages/todo.page';
import { TypographyPage } from './pages/ui/typography/typography.page';
import { ChatPage } from './pages/chat.page';
import { ChartsPage } from './pages/ui/charts/charts.page';
import { TablesPage } from './pages/ui/tables/tables.page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'ui/typography', component: TypographyPage },
    { path: 'ui/charts', component: ChartsPage },
    { path: 'ui/tables', component: TablesPage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegistrationPage },
    { path: 'user/profile', component: UserProfilePage },
    { path: 'blog', component: BlogPage },
    { path: 'admin/blog', component: BlogAdminPage, canActivate: [ AuthGuard ] },
    { path: 'admin/blog/post/create', component: PostAdminPage, canActivate: [ AuthGuard ] },
    { path: 'admin/blog/post/:id', component: PostAdminPage, canActivate: [ AuthGuard ] },
    { path: 'todo', component: TodoPage },
    { path: 'chat', component: ChatPage },
];
