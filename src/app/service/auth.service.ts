import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Auth, signInWithPopup, GoogleAuthProvider, authState } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/login';
  private apiUrl2 = 'http://localhost:8080/api/users';

  public loggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSource.asObservable();

  constructor(private http: HttpClient, private auth: Auth, private userService: UserService) {
    this.checkAuthState();
  }

  // Verifica el estado de autenticación
  checkAuthState() {
    authState(this.auth).subscribe((user: any) => {
      this.loggedInSource.next(!!user); 
    });
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

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return new Observable(observer => {
      signInWithPopup(this.auth, provider)
        .then(result => {
          console.log("Inicio de sesión exitoso con Google");
          observer.next(result.user);
          observer.complete();
        })
        .catch(error => {
          console.error("Error en el inicio de sesión con Google:", error);
          observer.error(error); // Lanza el error para manejarlo más tarde si es necesario
        });
    });
  }

  validateEmail(email: string): Observable<boolean> {
    console.log(email);
    return this.http.get<boolean>(`${this.apiUrl2}/check-email?email=${email}`);
  }

  async validateGoogleUserAndLogin(): Promise<boolean> {
    const user = await this.auth.currentUser;
    if (user) {
      const email = user.email;
      if (email) {
        try {
          const exists = await this.validateEmail(email).toPromise();
          if (exists) {
            console.log("Correo verificado y existe en la base de datos.");
            
            // Aquí hacemos la solicitud con `responseType: 'text'`
            const token = await this.http
              .get(`${this.apiUrl2}/get-token?email=${encodeURIComponent(email)}`, { responseType: 'text' })
              .toPromise();
            
            if (token) {
              console.log("Token recibido:", token);
              localStorage.setItem('token', token); // Guarda el token en localStorage
              return true;
            } else {
              console.error("Error al recibir el token del servidor.");
              return false;
            }
          } else {
            console.log("Correo no registrado en la base de datos.");
            return false;
          }
        } catch (error) {
          console.error("Error al validar el correo:", error);
          return false;
        }
      } else {
        console.error("El correo del usuario de Google es nulo.");
        return false;
      }
    } else {
      console.error("No hay usuario autenticado.");
      return false;
    }
  }

  getRoles(token: string): string[] {
    if (!token || typeof token !== 'string') {
        console.error("Token inválido:", token);
        return [];
    }

    try {
        const decoded: any = jwtDecode(token);
        return decoded.authorities || [];
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return []; 
    }
  }

  logout(): Promise<void> {
    return this.auth.signOut().then(() => {
      console.log('Sesión cerrada');
      localStorage.removeItem('token');
      this.loggedInSource.next(false);
    });
  }
  
}