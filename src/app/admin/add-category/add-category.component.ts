import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Categoria } from '../../model/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  standalone: false,
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  categoria: Categoria = {
    categoriaId: 0,
    nombreCategoria: '',
    descripcionCategoria: '',
  };
  alerts: { type: string; message: string }[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // Método para agregar categoría
  addCategory(): void {
    this.categoryService.createCategoria(this.categoria).subscribe({
      next: (response) => {
        this.showAlert('success', 'Categoría agregada con éxito.');
        setTimeout(() => this.router.navigate(['/admin/all-categories']), 1000); // Navega después de 1 segundo
      },
      error: (err) => {
        this.showAlert('danger', 'Error al agregar la categoría.');
        console.error('Error al crear la categoría', err);
      },
    });
  }

  // Método para mostrar alertas
  showAlert(type: string, message: string): void {
    this.alerts.push({ type, message });
  }

  // Método para cerrar una alerta
  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }
}
