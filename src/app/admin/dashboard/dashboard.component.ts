import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
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
  public totalIncidences: number = 0;
  public totalCategories: number = 0;
  public categoryCount: number = 0;
  public userStatsByRoles: any[] = [];
  public userStatsByRegistrationMonth: any[] = [];
  public mostUsedCategories: any[] = [];
  public isLoading = true;

  // Datos para los gráficos
  public incidenceChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Total Incidencias'],
    datasets: [
      { 
        data: [0], 
        label: 'Total Incidencias',
        backgroundColor: ['rgba(54, 162, 235, 0.6)']
      }
    ]
  };

  public categoryChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Total Categorías'],
    datasets: [
      { 
        data: [0], 
        label: 'Total Categorías',
        backgroundColor: ['rgba(255, 99, 132, 0.6)']
      }
    ]
  };

  public userRolesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Usuarios por Rol',
        backgroundColor: []
      }
    ]
  };

  public registrationMonthChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Registro Usuarios por Mes',
        backgroundColor: []
      }
    ]
  };

  public categoriesPieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Categorías Más Usadas',
        backgroundColor: [] // Colores para cada sección del gráfico
      }
    ]
  };

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: ''
      }
    }
  };

  public chartOptionsPie: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Categorías Más Usadas'
      }
    }
  };

  constructor(
    private incidentService: IncidentService,
    private categoryService: CategoryService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // Cargar datos en paralelo
    Promise.all([
      this.loadTotalIncidences(),
      this.loadCategoryCount(),
      this.loadUserStatsByRoles(),
      this.loadUserStatsByRegistrationMonth(),
      this.loadMostUsedCategories()
    ]).then(() => {
      this.isLoading = false; 
      this.cdr.detectChanges(); 
    }).catch(error => {
      console.error('Error al cargar datos:', error);
      this.isLoading = false;
    });
  }

  loadTotalIncidences(): Promise<void> {
    return new Promise((resolve) => {
        this.incidentService.getTotalIncidences().subscribe((total) => {
            console.log('Total de incidencias:', total);
            this.totalIncidences = total;
            this.incidenceChartData.datasets[0].data[0] = total;
            resolve();
        }, error => {
            console.error('Error al cargar el total de incidencias:', error);
            resolve();
        });
    });
}

loadCategoryCount(): Promise<void> {
  return new Promise((resolve) => {
      this.categoryService.getCategoryCount().subscribe((count) => {
          console.log('Conteo de categorías:', count);
          this.totalCategories = count;
          this.categoryChartData.datasets[0].data[0] = count;
          resolve();
      }, error => {
          console.error('Error al cargar el conteo de categorías:', error);
          resolve();
      });
  });
}

  loadUserStatsByRoles(): Promise<void> {
    return new Promise((resolve) => {
        this.userService.getStatsByRoles().subscribe((stats) => {
            console.log('Estadísticas por roles de usuario:', stats); 
            
            if (stats && stats.length > 0) {
                this.userRolesChartData.labels = stats.map(role => {
                    switch (role.rol) {
                        case 1:
                            return 'Usuario';
                        case 2:
                            return 'Administrador'; 
                        default:
                            return `Rol ${role.rol}`;
                    }
                });

                this.userRolesChartData.datasets[0].data = stats.map(role => role.total); 

                this.userRolesChartData.datasets[0].backgroundColor = stats.map((_, index) => {
                    const colors = [
                        'rgba(75,192,192,0.6)', 
                        'rgba(153,102,255,0.6)', 
                        'rgba(255,159,64,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,99,132,0.6)'
                    ];
                    return colors[index % colors.length];
                });
            }

            resolve();
        }, error => {
            console.error('Error al cargar estadísticas por roles de usuario:', error);
            resolve();
        });
    });
}

  loadUserStatsByRegistrationMonth(): Promise<void> {
    return new Promise((resolve) => {
      this.userService.getStatsByRegistrationMonth().subscribe((stats) => {

        console.log('Estadísticas por mes de registro:', stats);
        
        if (stats && stats.length > 0) {
          this.registrationMonthChartData.labels = stats.map(month => {
            const monthIndex = month.mes - 1; 
            return this.getMonthName(monthIndex)
          });

          this.registrationMonthChartData.datasets[0].data = stats.map(month => month.total); 

          this.registrationMonthChartData.datasets[0].backgroundColor = stats.map((_, index) => {
            const colors = [
              'rgba(75,192,192,0.6)', 
              'rgba(153,102,255,0.6)', 
              'rgba(255,159,64,0.6)',
              'rgba(54,162,235,0.6)',
              'rgba(255,99,132,0.6)'
            ];
            return colors[index % colors.length];
          });
        }

        resolve();
      }, error => {
        console.error('Error al cargar estadísticas por mes de registro:', error);
        resolve(); 
      });
    });
  }

  private getMonthName(monthIndex: number): string {
      const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 
          'Junio', 'Julio', 'Agosto', 'Septiembre', 
          'Octubre', 'Noviembre', 'Diciembre'
      ];
      return monthNames[monthIndex] || ''; 
  }

  loadMostUsedCategories(): Promise<void> {
    return new Promise((resolve) => {
        this.categoryService.getMostUsedCategories().subscribe((categories) => {
            console.log('Categorías más utilizadas:', categories); 

            if (categories && categories.length > 0) {
                this.categoriesPieChartData.labels = categories.map(category => category.nombre); 
                this.categoriesPieChartData.datasets[0].data = categories.map(category => category.total); 

                console.log('Etiquetas del gráfico de torta:', this.categoriesPieChartData.labels);
                console.log('Datos del gráfico de torta:', this.categoriesPieChartData.datasets[0].data);

                this.categoriesPieChartData.datasets[0].backgroundColor = categories.map((_, index) => {
                    const colors = [
                        'rgba(75,192,192,0.6)', 
                        'rgba(153,102,255,0.6)', 
                        'rgba(255,159,64,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,99,132,0.6)'
                    ];
                    return colors[index % colors.length];
                });
            } else {
                console.warn('No se encontraron categorías más utilizadas.');
            }

            resolve();
        }, error => {
            console.error('Error al cargar las categorías más utilizadas:', error);
            resolve();
        });
    });
  }
}