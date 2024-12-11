import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../model/incident.model';
@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css'
})
export class UpdateIncidentComponent {
//   incidencia: Incident = {
//     incidenciaId: 0,
//     descripcion: '',
//     direccion: '',
//     fecha: new Date(),
//     latitud: 0,
//     longitud: 0,
//     localidad: '',
//   };
//   alerts: { type: string; message: string }[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private incidentService: IncidentService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Obtener el ID del usuario desde el localStorage
//     const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
//     const usuarioId = usuario.usuarioId;  // Obtén el ID del usuario desde el localStorage

//     if (usuarioId) {
//       // Obtener el ID de la incidencia desde la ruta
//       const incidentId = +this.route.snapshot.paramMap.get('id')!;
//       this.loadIncident(usuarioId, incidentId);
//     } else {
//       this.showAlert('danger', 'Usuario no autenticado');
//       this.router.navigate(['/login']); // Redirigir si no hay ID de usuario
//     }
//   }


//     loadIncident(usuarioId: number, incidentId: number): void {
//     this.incidentService.getIncidenciasByUsuarioId(usuarioId).subscribe({
//       next: (data) => {
//         // Filtrar la incidencia que coincida con el ID de la incidencia
//         const foundIncident = data.find((incident) => incident.incidenciaId === incidentId);
//         if (foundIncident) {
//           this.incidencia = foundIncident;

//           if (typeof this.incidencia.fecha === 'string') {
//             this.incidencia.fecha = new Date(this.incidencia.fecha); // Convertir la fecha a un objeto Date
//           }
  
//           // Verifica que la fecha sea válida
//           if (isNaN(this.incidencia.fecha.getTime())) {
//             console.error('Fecha no válida', this.incidencia.fecha);
//           } else {
//             // Si es válida, puedes continuar
//             this.incidencia.fecha.setHours(0, 0, 0, 0); // Asegúrate de que solo sea la fecha sin hora
//           }
          
//         } else {
//           this.showAlert('danger', 'Incidencia no encontrada');
          
//         }
//       },



//       error: (err) => {
//         this.showAlert('danger', 'Error al cargar la incidencia');
//         console.error('Error al cargar la incidencia', err);
//       },
//     });
//   }

//   // Convertir la fecha a formato 'yyyy-MM-ddThh:mm' para el campo datetime-local
//   getFormattedDate(date: Date): string {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
//     const day = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
//     return `${year}-${month}-${day}`; // Solo 'yyyy-MM-dd'
//   }


//     updateIncidencia(): void {
//     this.incidentService.updateIncidencia(this.incidencia).subscribe({
//       next: (response) => {
//         this.showAlert('success', 'Incidencia actualizada con éxito');
//         setTimeout(() => this.router.navigate(['/admin/all-incidents']), 1000);
//       },
//       error: (err) => {
//         this.showAlert('danger', 'Error al actualizar la incidencia');
//         console.error('Error al actualizar la incidencia', err);
//       },
//     });
//   }

//   showAlert(type: string, message: string): void {
//     this.alerts.push({ type, message });
//   }

//   closeAlert(index: number): void {
//     this.alerts.splice(index, 1);
//   }
// 
}
