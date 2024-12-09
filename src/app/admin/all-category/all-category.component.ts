import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Categoria } from '../../model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  standalone: false,
  styleUrls: ['./all-category.component.css'],
})
export class AllCategoryComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  searchTerm: string = '';
  alerts: { type: string; message: string }[] = [];
  categoriaAEliminar?: Categoria; // Para almacenar la categoría que está siendo eliminada

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoryService.getAllCategorias().subscribe(
      (data) => {
        this.categorias = data;
        this.categoriasFiltradas = data;
      },
      (error) => this.showAlert('danger', 'Error al listar categorías.')
    );
  }

  buscarCategoria(): void {
    if (this.searchTerm.trim() !== '') {
      this.categoriasFiltradas = this.categorias.filter((categoria) =>
        categoria.nombreCategoria
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.categoriasFiltradas = this.categorias;
    }
  }

  editarCategoria(id: number): void {
    this.router.navigate(['/admin/update-category', id]);
  }

  // Este método solo muestra la alerta de confirmación
  confirmarEliminarCategoria(categoria: Categoria): void {
    this.categoriaAEliminar = categoria; // Almacena la categoría que se va a eliminar
    this.showAlert(
      'warning',
      `¿Estás seguro de eliminar la categoría: ${categoria.nombreCategoria}?`
    );
  }

  // Confirmación de la eliminación, cuando el usuario confirma la acción
  eliminarCategoria(): void {
    if (this.categoriaAEliminar) {
      this.categoryService
        .deleteCategoria(this.categoriaAEliminar.categoriaId)
        .subscribe(
          () => {
            // Cerrar la alerta de confirmación
            this.closeAlertByType('warning');
            // Mostrar alerta de éxito
            this.showAlert('success', 'Categoría eliminada con éxito.');
            this.listarCategorias(); // Refresca la lista de categorías
            this.categoriaAEliminar = undefined; // Limpia la categoría seleccionada
            // Cerrar la alerta de éxito después de 1 segundo
            setTimeout(() => {
              this.closeAlertByType('success');
            }, 1000);
          },
          (error) => {
            // Cerrar la alerta de confirmación
            this.closeAlertByType('warning');
            this.showAlert('danger', 'Error al eliminar categoría.');
            this.categoriaAEliminar = undefined; // Limpia la categoría seleccionada
            // Cerrar la alerta de error después de 1 segundo
            setTimeout(() => {
              this.closeAlertByType('danger');
            }, 1000);
          }
        );
    }
  }

  // Método para cancelar la eliminación
  cancelarEliminarCategoria(): void {
    // Cerrar la alerta de confirmación
    this.closeAlertByType('warning');
    this.categoriaAEliminar = undefined; // Limpia la categoría seleccionada
    this.showAlert('info', 'Operación de eliminación cancelada.');
    // Cerrar la alerta de cancelación después de 1 segundo
    setTimeout(() => {
      this.closeAlertByType('info');
    }, 1000);
  }

  navegarCrearCategoria(): void {
    this.router.navigate(['/admin/add-category']);
  }

  showAlert(type: string, message: string): void {
    this.alerts.push({ type, message });
  }

  closeAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  // Método para cerrar alertas de un tipo específico
  closeAlertByType(type: string): void {
    const index = this.alerts.findIndex(alert => alert.type === type);
    if (index !== -1) {
      this.closeAlert(index);
    }
  }
}
