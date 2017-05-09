import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePage } from './pages/home.page';
import { UserProfilePage } from './pages/user/profile.page';
import { BlogPage } from './pages/blog/blog.page';
import { BlogAdminPage } from './pages/blog/blog.admin.page';
import { TypographyPage } from './pages/ui/typography/typography.page';
import { TablesPage } from './pages/ui/tables/tables.page';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'ui/typography', component: TypographyPage },
    { path: 'ui/charts/d3', loadChildren: './pages/ui/charts/d3/d3.module#D3Module' },
    { path: 'ui/charts/highcharts', loadChildren: './pages/ui/charts/highcharts/highcharts.module#HighchartsModule' },
    { path: 'ui/tables', component: TablesPage },
    { path: 'ui/maps', loadChildren: './pages/ui/maps/maps.module#MapsModule' },
    { path: 'ui/calendar', loadChildren: './pages/ui/calendar/calendar.module#CalendarPageModule' },
    { path: 'login', loadChildren: './pages/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/registration.module#RegistrationModule'},
    { path: 'user/profile', component: UserProfilePage },
    { path: 'blog', component: BlogPage },
    { path: 'todo', loadChildren: './pages/todo.module#TodoModule' },
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
