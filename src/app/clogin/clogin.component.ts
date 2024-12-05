import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.css'],
  standalone: false
})
export class CloginComponent {
  user: string = '';
  pwd: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user, this.pwd).subscribe(
      token => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); 
        
        const roles = this.authService.getRoles(token);
        console.log('Roles:', roles); 
        
        this.authService['loggedInSource'].next(true); 

        if (roles.includes('ADMINISTRADOR')) {
          this.router.navigate(['/admin']); 
        } else if (roles.includes('USUARIO')) {
          this.router.navigate(['/user']); 
        } else {
          this.router.navigate(['/login']); 
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo nuevamente.';
      }
    );
  }
}