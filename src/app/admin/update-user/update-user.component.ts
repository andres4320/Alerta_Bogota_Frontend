import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit  {

  user: User = {
    usuarioId: 0,
    fechaRegistro: '',
    primerApellido: '',
    primerNombre: '',
    rolId: 0,
    segundoApellido: '',
    segundoNombre: '',
    useEmail: '',
    usePass: '',
  };

  alerts: { type: string; message: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser(userId);
  }

  loadUser(id: number): void {
    this.userService.listAllUsers().subscribe({
      next: (users) => {
        this.user = users.find((u) => u.usuarioId === id)!;
      },
      error: (err) => {
        this.showAlert('danger', 'Error al cargar el usuario.');
        console.error('Error al cargar el usuario', err);
      },
    });
  }

  updateUserRole(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.showAlert('success', 'Rol del usuario actualizado con éxito.');
        setTimeout(() => this.router.navigate(['/admin/all-user']), 1000);
      },
      error: (err) => {
        this.showAlert('danger', 'Error al actualizar el rol del usuario.');
        console.error('Error al actualizar el rol del usuario', err);
      },
    });
  }

  showAlert(type: string, message: string): void {
    this.alerts.push({ type, message });
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

}
