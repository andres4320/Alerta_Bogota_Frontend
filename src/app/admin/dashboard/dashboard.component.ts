import { Component } from '@angular/core';

interface Incidencia {
  fecha: string;
  localidad: string;
  categoria: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  localidades = ['Centro', 'Norte', 'Sur', 'Occidente', 'Oriente'];
  categorias = ['Robo', 'Accidente', 'Vandalismo', 'Otros'];
  incidencias: Incidencia[] = []; // Definimos el tipo aquí

  constructor() {
    this.loadIncidencias();
  }

  loadIncidencias() {
    // Simulación de carga de datos
    this.incidencias = [
      { fecha: '2024-01-01', localidad: 'Centro', categoria: 'Robo' },
      { fecha: '2024-01-02', localidad: 'Norte', categoria: 'Accidente' },
      // Agregar más datos...
    ];
  }

}
