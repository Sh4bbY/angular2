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
import { D3Page } from './pages/ui/charts/d3/d3.page';
import { TablesPage } from './pages/ui/tables/tables.page';
import { HighchartsPage } from './pages/ui/charts/highcharts/highcharts.page';
import { CalendarPage } from './pages/ui/calendar/calendar.page';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'ui/typography', component: TypographyPage },
    { path: 'ui/charts/d3', loadChildren: './pages/ui/charts/d3/d3.module#D3Module' },
    { path: 'ui/charts/highcharts', loadChildren: './pages/ui/charts/highcharts/highcharts.module#HighchartsModule' },
    { path: 'ui/tables', component: TablesPage },
    { path: 'ui/maps', loadChildren: './pages/ui/maps/maps.module#MapsModule' },
    { path: 'ui/calendar', loadChildren: './pages/ui/calendar/calendar.module#CalendarPageModule' },
    { path: 'login', component: LoginPage },
    { path: 'register', loadChildren: './pages/registration.module#RegistrationModule'},
    { path: 'user/profile', component: UserProfilePage },
    { path: 'blog', component: BlogPage },
    { path: 'todo', component: TodoPage },
    { path: 'chat', loadChildren: './pages/chat.module#ChatModule' },
    { path: 'admin/blog', component: BlogAdminPage, canActivate: [ AuthGuard ] },
    {
        path        : 'admin/blog/post/create',
        loadChildren: './pages/blog/post.admin.module#PostAdminModule',
        canActivate : [ AuthGuard ],
    },
    {
        path        : 'admin/blog/post/:id',
        loadChildren: './pages/blog/post.admin.module#PostAdminModule',
        canActivate : [ AuthGuard ],
    },
];
