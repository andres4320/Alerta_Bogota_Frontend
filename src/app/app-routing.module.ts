import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChomepageComponent } from './chomepage/chomepage.component';
import { CloginComponent } from './clogin/clogin.component';
import { CregisterComponent } from './cregister/cregister.component';

const routes: Routes = [
  { path: '', component: ChomepageComponent },
  { path: 'login', component: CloginComponent },
  { path: 'register', component: CregisterComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
