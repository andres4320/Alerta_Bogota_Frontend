import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { AllUserComponent } from './all-user/all-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AllCategoryComponent,
    AllUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
