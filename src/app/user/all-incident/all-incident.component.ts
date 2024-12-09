import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router
import { IncidentService } from '../../service/incident.service';  // Asegúrate de que la ruta sea correcta
import { Incident } from '../../model/incident.model';  // Asegúrate de que esta clase exista

@Component({
  selector: 'app-all-incident',
  templateUrl: './all-incident.component.html',
  styleUrls: ['./all-incident.component.css']  // Corregido el nombre del archivo de estilo
})
export class AllIncidentComponent implements OnInit {
  incidencias: Incident[] = [];  // Especificamos el tipo de datos como 'Incident'
  errorMessage: string = '';  // Mensaje de error en caso de que algo falle

  constructor(private incidentService: IncidentService, private router: Router) {}  // Corregido el nombre del servicio

  ngOnInit(): void {
    this.getIncidencias();
  }

  // Método para obtener las incidencias del usuario
  getIncidencias() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const usuarioId = usuario.id;  // Obtén el ID del usuario desde el localStorage

    if (!usuarioId) {
      this.errorMessage = 'No se ha encontrado el usuario. Asegúrate de estar autenticado.';
      return;
    }

    this.incidentService.getIncidenciasByUsuarioId(usuarioId).subscribe({
      next: (data) => {
        this.incidencias = data;
      },
      error: (err) => {
        console.error('Error al obtener incidencias:', err);
        this.errorMessage = 'Hubo un error al obtener las incidencias. Intenta nuevamente más tarde.';
      }
    });
  }

  // Método para eliminar una incidencia
  deleteIncidencia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta incidencia?')) {
      this.incidentService.deleteIncidencia(id).subscribe({
        next: () => {
          this.incidencias = this.incidencias.filter(incidencia => incidencia.incidencia_id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar incidencia:', err);
          alert('Hubo un problema al eliminar la incidencia.');
        }
      });
    }
  }
}
