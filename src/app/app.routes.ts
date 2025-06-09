import { Routes } from '@angular/router';
import { authGuard } from '../auth-guard';
import { Login } from "./login/login";
import { Dashboard } from './dashboard/dashboard';
import { PatientListComponent } from './patient-list/patient-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'patient-list', component: PatientListComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
