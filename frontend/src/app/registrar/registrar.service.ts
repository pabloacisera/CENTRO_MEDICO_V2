import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Registro } from './registro'
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  url = "http://localhost:3000/api/v2/usuario"

  constructor(private http: HttpClient) { }

  registrar(data: any) {
    return this.http.post<any>(this.url, data)
      .pipe(
        catchError((error) => {
          console.error('Error al registrar usuario:', error);
          return throwError(error); // Lanza el error para ser manejado por el componente
        })
      );
  }
}
