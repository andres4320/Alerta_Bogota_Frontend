import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/Category';

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/ListCategory`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  // Crear una categoría
  createCategoria(categoria: Categoria): Observable<string> {
    console.log('Enviando datos: ', categoria); // Verifica que los datos son correctos
    return this.http.post<string>(`${this.baseUrl}/createCategory`, categoria, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'text' as 'json', // Importante para recibir texto en lugar de JSON
    });
  }

  // Actualizar una categoría
  updateCategoria(categoria: Categoria): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/UpdateCategory`, categoria, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'text' as 'json',
    });
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/DeleteCategory?id=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'text' as 'json',
    });
  }

  getCategoryCount(): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<number>(`${this.baseUrl}/countCategories`, { headers });
  }

  getMostUsedCategories(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/mostUsedCategories`, { headers });
  }
}
