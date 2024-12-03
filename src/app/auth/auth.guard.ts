// src/app/auth.guard.ts

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
      this.router.navigate(['/login']); // Redirige a login si no está autenticado
      return false;
    }

    const roles = this.authService.getRoles(token); // Obtiene los roles del token

    // Accede a expectedRole usando la notación de corchetes
    const expectedRole = route.data['expectedRole']; 

    // Verifica si el rol esperado es ADMINISTRADOR o USUARIO
    if (expectedRole) {
      if (expectedRole === 'ADMINISTRADOR' && !roles.includes('ADMINISTRADOR')) {
        this.router.navigate(['/']); // Redirige al dashboard del usuario si no tiene acceso como ADMINISTRADOR
        return false;
      } else if (expectedRole === 'USUARIO' && !roles.includes('USUARIO')) {
        this.router.navigate(['/']); // Redirige al dashboard del usuario si no tiene acceso como USUARIO
        return false;
      }
    }

    return true; // Permite el acceso si todo está bien
  }
}