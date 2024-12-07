import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../model/incident.model';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent {
  apiKey: string = 'AIzaSyA3OEndwZOWLjNf19eM9lcOlc0YHyalWrI'; 
  incident: Incident = {
    descripcion: '',
    direccion: '',
    fecha: new Date(),
    latitud: 4.60971, 
    longitud: -74.08175, 
    localidad: '',
    usuario_id: 0,
    categoria_id: 0
  
  };
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
    private http: HttpClient
  ) {}


  

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
      this.incidentService.registerUser(this.incident).subscribe({
        next: response => {
          alert(JSON.stringify(response));
          this.router.navigate(['postIncidence']);
        },
        error: err => {
          alert(`Error al registrar la incidencia: ${err.message}`);
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
