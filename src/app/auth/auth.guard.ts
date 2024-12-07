import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    return this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }

        // Obtén el token del usuario actual
        const token = localStorage.getItem('token') ?? '';
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
      })
    );
  }
}