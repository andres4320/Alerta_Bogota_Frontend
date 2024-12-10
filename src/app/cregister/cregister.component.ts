import { Component } from '@angular/core';
import { UserService } from '../service/user.service'; 
import { AuthService } from '../service/auth.service';
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
  alerts: { type: string; message: string }[] = [];
  fieldAlerts: { [key: string]: string } = {};
  loading: boolean = false;

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
    // Limpiar alertas previas
    this.fieldAlerts = {};
  
    this.userService.registerUser(this.user).subscribe({
      next: response => {
        this.showAlert('success', 'Usuario registrado exitosamente');
        setTimeout(() => this.router.navigate(['/login']), 5000);
      },
      error: err => {
        if (typeof err === 'object') {
          
          this.fieldAlerts = err; 
        } else {
          this.fieldAlerts['general'] = 'Error al registrar el usuario.';
        }
      }
    });
  }  

  registerWithGoogle() {
    this.loading = true;
    this.authService.loginWithGoogle().subscribe({
      next: async user => {
        console.log('Usuario autenticado con Google:', user);
  
        this.user.useEmail = user.email;
  
        try {
          const exists = await this.authService.validateEmail(this.user.useEmail).toPromise();
          if (exists) {
            this.fieldAlerts['useEmail'] = 'El correo ya está registrado. Por favor, inicia sesión.';
          } else {
            console.log('Correo no registrado. Mostrando modal de registro.');
            this.showModal = true;
          }
        } catch (error) {
          console.error('Error al verificar el correo:', error);
          alert('Error al verificar el correo. Inténtalo nuevamente.');
        }
        this.loading = false;
      },
      error: error => {
        console.error('Error al iniciar sesión con Google:', error);
        alert('Error al iniciar sesión con Google.');
        this.loading = false;  
      }
    });
  }

  showAlert(type: string, message: string): void {
    const alert = { type, message };
    this.alerts.push(alert);
  
    setTimeout(() => {
      const index = this.alerts.indexOf(alert);
      if (index !== -1) {
        this.alerts.splice(index, 1);
      }
    }, 15000);
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }
}
