import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Asegúrate de importar correctamente
import { Router } from '@angular/router';

@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrl: './clogin.component.css'
})
export class CloginComponent {
  user: string = '';
  pwd: string = '';
  errorMessage: string = ''; // Para almacenar mensajes de error

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user, this.pwd).subscribe(
      token => {
        console.log('Token recibido:', token);
        localStorage.setItem('token', token); // Almacena el token
        
        // Decodificar el token para obtener los roles
        const roles = this.authService.getRoles(token);
        console.log('Roles:', roles); // Muestra los roles en la consola
        
        // Redirigir según el rol
        if (roles.includes('ADMINISTRADOR')) {
          this.router.navigate(['/admin']); // Redirige a admin si es administrador
        } else if (roles.includes('USUARIO')) {
          this.router.navigate(['/user']); // Redirige a user si es usuario
        } else {
          this.router.navigate(['/login']); // Redirige a login si no tiene un rol válido
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo nuevamente.'; // Mensaje de error
      }
    );
  }
}