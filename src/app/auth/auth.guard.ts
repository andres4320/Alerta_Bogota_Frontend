import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles = this.authService.getRoles(token); 

    const expectedRole = route.data['expectedRole']; 

    if (expectedRole) {
      if (expectedRole === 'ADMINISTRADOR' && !roles.includes('ADMINISTRADOR')) {
        this.router.navigate(['/']); 
        return false;
      } else if (expectedRole === 'USUARIO' && !roles.includes('USUARIO')) {
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}