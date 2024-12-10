import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { AllUserComponent } from './all-user/all-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AllCategoryComponent,
    AllUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AlertModule.forRoot(),
    
  ],
})
export class AdminModule {}
