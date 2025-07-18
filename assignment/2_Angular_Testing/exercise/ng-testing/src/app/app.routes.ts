import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GreetingComponent } from './greeting/greeting.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'greeting', component: GreetingComponent
    },
    {
        path: 'dashboard', component: DashboardComponent // Assuming you have a DashboardComponent
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
