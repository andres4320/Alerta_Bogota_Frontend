import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRADOR' } },
  { path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRADOR' } },
  { path: 'update-category/:id', component: UpdateCategoryComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRADOR' } },
  { path: 'all-categories', component: AllCategoryComponent, canActivate: [AuthGuard], data: { expectedRole: 'ADMINISTRADOR' } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }