import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  listAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-users`).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete`, { body: { usuarioId: userId } }).pipe(
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