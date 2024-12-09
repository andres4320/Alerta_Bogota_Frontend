import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Categoria } from '../../model/category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  standalone: false,
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  categoria: Categoria = {
    categoriaId: 0,
    nombreCategoria: '',
    descripcionCategoria: '',
  };
  alerts: { type: string; message: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Capturar ID desde la ruta
    this.loadCategory(id); // Cargar la categoría por ID
  }

  loadCategory(id: number): void {
    this.categoryService.getAllCategorias().subscribe({
      next: (data) => {
        this.categoria = data.find((cat) => cat.categoriaId === id)!; // Encontrar la categoría por ID
      },
      error: (err) => {
        this.showAlert('danger', 'Error al cargar la categoría');
        console.error('Error al cargar la categoría', err);
      },
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategoria(this.categoria).subscribe({
      next: (response) => {
        this.showAlert('success', 'Categoría actualizada con éxito');
        setTimeout(() => this.router.navigate(['/admin/all-categories']), 1000); // Redirigir después de 1 segundo
      },
      error: (err) => {
        this.showAlert('danger', 'Error al actualizar la categoría');
        console.error('Error al actualizar la categoría', err);
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
