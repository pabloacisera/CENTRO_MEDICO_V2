import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogearAdministrativoService {

  url = "http://localhost:3000/api/v2/usuario/auth-admin"

  constructor(private http: HttpClient) { }

  authAdmin(data: any) {
    return this.http.post<any>(this.url, data)
      .pipe(
        catchError((error) => {
          console.error('Error al registrar usuario:', error);
          return throwError(error); // Lanza el error para ser manejado por el componente
        })
      );
  }
}
