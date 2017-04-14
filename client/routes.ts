import { HomePage } from './src/pages/home.page';
import { LoginPage } from './src/pages/login.page';

export const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'login', component: LoginPage },
];
