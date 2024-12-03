import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { UpdateIncidentComponent } from './update-incident/update-incident.component';
import { ProfileComponent } from './profile/profile.component';
import { AllIncidentComponent } from './all-incident/all-incident.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'USUARIO' } },
  { path: 'add-incident', component: AddIncidentComponent, canActivate: [AuthGuard], data: { expectedRole: 'USUARIO' } },
  { path: 'update-incident/:id', component: UpdateIncidentComponent, canActivate: [AuthGuard], data: { expectedRole: 'USUARIO' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { expectedRole: 'USUARIO' } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
