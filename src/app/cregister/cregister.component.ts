import { Component } from '@angular/core';
import { UserService } from '../service/user.service'; 
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-cregister',
  templateUrl: './cregister.component.html',
  styleUrls: ['./cregister.component.css'],
  standalone: false
})
export class CregisterComponent {
  user: User = {
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

  constructor(private userService: UserService, private router: Router) {} 

  register() {
    this.userService.registerUser(this.user).subscribe({
      next: response => {
        
        alert(JSON.stringify(response)); 
        this.router.navigate(['/login']); 
      },
      error: err => {
        alert(`Error al registrar el usuario: ${err.message}`); 
        console.error('Error:', err);
      }
    });
  }
}