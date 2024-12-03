import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { UpdateIncidentComponent } from './update-incident/update-incident.component';
import { ProfileComponent } from './profile/profile.component';
import { AllIncidentComponent } from './all-incident/all-incident.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddIncidentComponent,
    UpdateIncidentComponent,
    ProfileComponent,
    AllIncidentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
