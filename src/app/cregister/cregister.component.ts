import { Component } from '@angular/core';
import { UserService } from '../service/user.service'; 
import { AuthService } from '../service/auth.service'; // Importa AuthService para login con Google
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-cregister',
  templateUrl: './cregister.component.html',
  styleUrls: ['./cregister.component.css'],
  standalone: false
})
export class CregisterComponent {

  user: User;
  showModal = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.user = {
      usuarioId: 0,
      fechaRegistro: new Date().toISOString(),
      primerApellido: '',
      primerNombre: '',
      rolId: 1,
      segundoApellido: '',
      segundoNombre: '',
      useEmail: '',
      usePass: ''
    };
  }

  register() {
    this.userService.registerUser(this.user).subscribe({
      next: response => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert(`Error al registrar el usuario: ${err.message}`);
        console.error('Error:', err);
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: async user => {
        console.log('Usuario autenticado con Google:', user);
  
        this.user.useEmail = user.email;
  
        try {
          const exists = await this.authService.validateEmail(this.user.useEmail).toPromise();
          if (exists) {
            alert('El correo ya está registrado. Por favor, inicia sesión.');
            this.router.navigate(['/login']); 
          } else {
            console.log('Correo no registrado. Mostrando modal de registro.');
            this.showModal = true; // Muestra el modal para registrar al nuevo usuario
          }
        } catch (error) {
          console.error('Error al verificar el correo:', error);
          alert('Error al verificar el correo. Inténtalo nuevamente.');
        }
      },
      error: error => {
        console.error('Error al iniciar sesión con Google:', error);
        alert('Error al iniciar sesión con Google.');
      }
    });
  }
}
