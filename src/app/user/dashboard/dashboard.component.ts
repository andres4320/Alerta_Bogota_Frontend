import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import { ChartConfiguration, registerables, Chart } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';

// Registrar todas las escalas y componentes necesarios
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  public localityChartLegend = true;
  public localityChartPlugins = [];
  
  public localityChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Total Incidencias por Localidad',
        backgroundColor: [] 
      }
    ]
  };
  
  public localityChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Incidencias por Localidad'
      }
    }
  };

  public categoryChartLegend = true;
  public categoryChartPlugins = [];
  
  public categoryChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Total Incidencias por Categoría',
        backgroundColor: []
      }
    ]
  };
  
  public categoryChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Incidencias por Categoría'
      }
    }
  };

  public dateChartLegend = true;
  public dateChartPlugins = [];
  
  public dateChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Total Incidencias por Fecha',
        backgroundColor: []
      }
    ]
  };
  
  public dateChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Incidencias por Fecha'
      }
    }
  };

  // Variable para controlar el estado de carga
  public isLoading = true;

  constructor(private incidentService: IncidentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Usar Promise.all para esperar a que todas las solicitudes se completen
    Promise.all([
      this.loadLocalityData(),
      this.loadCategoryData(),
      this.loadDateData()
    ]).then(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  loadLocalityData(): Promise<void> {
    return new Promise((resolve) => {
      this.incidentService.getCountByLocality().subscribe((data) => {
        const labels = data.map(item => item.localidad);
        const counts = data.map(item => item.total);
        
        this.localityChartData.labels = labels;
        this.localityChartData.datasets[0].data = counts;

        this.localityChartData.datasets[0].backgroundColor = counts.map((_, index) => {
          const colors = [
            'rgba(54, 162, 235, 0.6)', // Color para la primera barra
            'rgba(255, 99, 132, 0.6)', // Color para la segunda barra
            'rgba(75, 192, 192, 0.6)', // Color para la tercera barra
            'rgba(153, 102, 255, 0.6)', // Color para la cuarta barra
            'rgba(255, 159, 64, 0.6)'   // Color para la quinta barra
          ];
          return colors[index % colors.length];
        });

        resolve();
      });
    });
}

loadCategoryData(): Promise<void> {
    return new Promise((resolve) => {
      this.incidentService.getCountByCategory().subscribe((data) => {
        const labels = data.map(item => item.categoria);
        const counts = data.map(item => item.total);
        
        this.categoryChartData.labels = labels;
        this.categoryChartData.datasets[0].data = counts;

        // Asignar colores diferentes a cada barra
        this.categoryChartData.datasets[0].backgroundColor = counts.map((_, index) => {
          const colors = [
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)', 
            'rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)', 
            'rgba(255,159,64,0.6)'   
          ];
          return colors[index % colors.length];
        });

        resolve(); 
      });
    });
}

loadDateData(): Promise<void> {
    return new Promise((resolve) => {
      this.incidentService.getCountByDate().subscribe((data) => {
        const labels = data.map(item => item.fecha);
        const counts = data.map(item => item.total);
        
        this.dateChartData.labels = labels;
        this.dateChartData.datasets[0].data = counts;

        // Asignar colores diferentes a cada barra
        this.dateChartData.datasets[0].backgroundColor = counts.map((_, index) => {
          const colors = [
            'rgba(75,192,192,0.6)', 
            'rgba(153,102,255,0.6)', 
            'rgba(255,99,132,0.6)',   
            'rgba(54,162,235,0.6)',   
            'rgba(255,159,64,0.6)'     
          ];
          return colors[index % colors.length];
        });

        resolve(); 
      });
    });
  }
}