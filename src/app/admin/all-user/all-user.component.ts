import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  getRoleName(rolId: number): string {
    if (rolId === 1) {
      return 'Usuario';
    } else if (rolId === 2) {
      return 'Administrador';
    } else {
      return 'Desconocido'; 
    }
  }
  
  editarUsuario(id: number): void {
    this.router.navigate(['/admin/update-user', id]);
  }


  loadUsers(): void {
    this.userService.listAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  deleteUser(userId: number): void {
    console.log('Eliminando usuario con ID:', userId); 
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        this.userService.deleteUser(userId).subscribe({
            next: (response) => {
                console.log(response);
                this.loadUsers();
            },
            error: (err) => {
                console.error('Error al eliminar el usuario', err);
            }
        });
    }
}

}
