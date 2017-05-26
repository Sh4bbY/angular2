import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePage } from './pages/home.page';
import { UserProfilePage } from './pages/user/profile.page';
import { TypographyPage } from './pages/ui/typography/typography.page';
import { TablesPage } from './pages/ui/tables/tables.page';
import { LoginPage } from './pages/login.page';
import { RegistrationPage } from './pages/registration.page';
import { BlogModule } from './modules/blog.module';
import { TodoModule } from './modules/todo.module';
import { GameOfLifeComponent } from './components/game-of-life';
import { ShooterComponent } from './components/shooter';
import { PhysicsComponent } from './components/physics';
import { SphereComponent } from './components/sphere';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegistrationPage },
    { path: 'blog', loadChildren: './modules/blog.module#BlogModule' },
    { path: 'todo', loadChildren: () => TodoModule },
    { path: 'user/profile', component: UserProfilePage },
    { path: 'chat', loadChildren: './modules/chat.module#ChatModule' },
    { path: 'pixi', loadChildren: './modules/pixi.module#PixiModule' },
    { path: 'three', loadChildren: './modules/three.module#ThreeModule' },
    { path: 'ui/typography', component: TypographyPage },
    { path: 'ui/charts/d3', loadChildren: './modules/d3.module#D3Module' },
    { path: 'ui/charts/highcharts', loadChildren: './modules/highcharts.module#HighchartsModule' },
    { path: 'ui/tables', component: TablesPage },
    { path: 'ui/maps', loadChildren: './modules/maps.module#MapsModule' },
    { path: 'ui/calendar', loadChildren: './modules/calendar.module#CalendarModule' },
];
