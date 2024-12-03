import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login';
  private loggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSource.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken(); 
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedInSource.next(true);
    } else {
      this.loggedInSource.next(false);
    }
  }

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
    const decoded: any = jwtDecode(token); 
    return decoded.authorities || [];
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSource.next(false);
  }
}