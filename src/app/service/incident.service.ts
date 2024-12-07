import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Incident } from '../model/incident.model'; 

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
}