import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login'; // URL de tu API para login

  constructor(private http: HttpClient) { }

  login(user: string, pwd: string): Observable<string> {
    const body = new URLSearchParams();
    body.set('user', user);
    body.set('pwd', pwd);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, body.toString(), { headers, responseType: 'text' });
  }

  getRoles(token: string): string[] {
    const decoded: any = jwtDecode(token); // Decodifica el token JWT
    return decoded.authorities || []; // Devuelve los roles del token
  }

  decodeHeader(token: string): any {
    const decodedHeader = jwtDecode(token, { header: true }); // Decodifica solo el encabezado
    return decodedHeader;
  }
}