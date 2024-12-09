import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Incident } from '../model/incident.model'; 
import { LocalityCount } from '../model/locality-count.model';
import { CategoryCount } from '../model/category-count.model';
import { DateCount } from '../model/date-count.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = 'http://localhost:8080/api/incidences';

  constructor(private http: HttpClient) {}

  registerUser(incident: Incident): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/postIncidence`, incident).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de estado: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getCountByLocality(): Observable<LocalityCount[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<LocalityCount[]>(`${this.apiUrl}/countByLocality`, { headers });
  }

  getCountByCategory(): Observable<CategoryCount[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<CategoryCount[]>(`${this.apiUrl}/countByCategory`, { headers });
  }

  getCountByDate(): Observable<DateCount[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<DateCount[]>(`${this.apiUrl}/countByDate`, { headers });
  }

// Método para obtener las incidencias de un usuario
    getIncidenciasByUsuarioId(usuarioId: number): Observable<any[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });

      return this.http.get<any[]>(`${this.apiUrl}/searchByUsuario/${usuarioId}`, { headers });
    }

    // Método para eliminar una incidencia
    deleteIncidencia(id: number): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });

      return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }  
}