import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../model/incident.model';
import { CategoryService } from '../../service/category.service'; // Importa el servicio de categorías
import { Categoria } from '../../model/category.model'; // Asegúrate de tener este modelo
@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent {
  apiKey: string = 'AIzaSyA3OEndwZOWLjNf19eM9lcOlc0YHyalWrI'; 
  incident: Incident = {
    incidenciaId: 0,
    descripcion: '',
    direccion: '',
    fecha: new Date(),
    latitud: 4.60971, 
    longitud: -74.08175, 
    localidad: '',
    usuarioId: 0,
    categoriaId: 0
  
  };

  categorias: Categoria[] = []; // Propiedad para almacenar las categorías


  mapOptions: google.maps.MapOptions = {
    center: { lat: this.incident.latitud, lng: this.incident.longitud },
    zoom: 14,
  };
  marker: google.maps.MarkerOptions = {
    position: { lat: this.incident.latitud, lng: this.incident.longitud },
    draggable: false,
  };

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private http: HttpClient,
    private categoryService: CategoryService 
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Carga las categorías al inicializar el componente
  }

  loadCategories(): void {
    this.categoryService.getAllCategorias().subscribe(
      (data) => {
        this.categorias = data; 
        console.log('Categorías cargadas:', this.categorias);
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }
  

  // Método para obtener coordenadas
  getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get<any>(url).toPromise().then(response => {
      console.log('Respuesta de la API:', response);
      if (response.results && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('No se encontraron coordenadas para la dirección proporcionada.');
      }
    });
  }

  // Método para actualizar el mapa
  async updateMap() {
    try {
      const coordinates = await this.getCoordinates(this.incident.direccion);
      this.incident.latitud = coordinates.lat;
      this.incident.longitud = coordinates.lng;

      // Actualizar las opciones del mapa
      this.mapOptions = {
        ...this.mapOptions,
        center: { lat: this.incident.latitud, lng: this.incident.longitud },
      };

      // Actualizar la posición del marcador
      this.marker = {
        position: { lat: this.incident.latitud, lng: this.incident.longitud },
        draggable: false,
      };
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error al obtener las coordenadas: ${error.message}`);
        console.error('Error:', error.message);
      } else {
        alert('Error desconocido ocurrió');
        console.error('Error desconocido:', error);
      }    }
  }


  // Método para registrar la incidencia
  async register() {
    try {
      await this.updateMap(); // Asegurar que las coordenadas estén actualizadas
      
      // Obtener el ID del usuario desde localStorage
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const usuarioId = usuario.usuarioId; // Obtén el ID del usuario
      console.log('ID del usuario:', usuarioId);
      if (!usuarioId) {
        alert('No se ha encontrado el usuario. Asegúrate de estar autenticado.');
        return;
      }

      // Asignar el ID del usuario y categoría seleccionada al objeto incident
      this.incident.usuarioId = usuarioId;
      this.incident.categoriaId = Number(this.incident.categoriaId); 
      
      // Registrar la incidencia
      this.incidentService.registerIncident(this.incident).subscribe({
        next: response => {
          console.log('Datos a enviar:', this.incident);
          console.log('Incidente a enviar:', this.incident);

          alert('Incidencia registrada con éxito!');
          this.router.navigate(['postIncidence']);
        },
        error: err => {
          alert(`Error al registrar la incidencia: ${err.message}`);
          console.log('Datos a enviar:', this.incident);
          console.error('Error:', err);
        }
      });
      
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido';
      alert(`Error al registrar la incidencia: ${errorMessage}`);
      console.error('Error:', error);
    }
  }
}
