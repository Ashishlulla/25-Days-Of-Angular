import { Routes } from '@angular/router';
import { EmployeeForm } from './components/employee-form/employee-form';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: 'employees/add', component: EmployeeForm },
    {path:'dashboard', component: Dashboard},
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
];
