import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

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
  loading: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

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

  loginWithGoogle() {
    this.loading = true;
    this.authService.loginWithGoogle().subscribe({
      next: async (user) => {
        console.log('Usuario autenticado con Google:', user);
        // Verificar si el correo está registrado en la base de datos
        const isValid = await this.authService.validateGoogleUserAndLogin();
        if (isValid) {
          console.log('Correo verificado. Iniciando sesión...');
          this.authService.loggedInSource.next(true);
          this.router.navigate(['/user']);
        } else {
          console.error('Correo no verificado.');
          this.errorMessage = 'El correo no está registrado en nuestra base de datos.';
          alert('El correo no está registrado en nuestra base de datos.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al iniciar sesión con Google:', error);
        this.errorMessage = error.message || 'Error al iniciar sesión con Google. Inténtalo nuevamente.';
        this.loading = false;
      }
    });
  }
}