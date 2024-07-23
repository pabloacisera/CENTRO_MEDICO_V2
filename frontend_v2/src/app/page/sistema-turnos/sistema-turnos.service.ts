import { Injectable } from '@angular/core';
import { Turnos } from './turnos';
import { from, Observable } from 'rxjs';
import axios from 'axios';
import { Cliente, Usuario } from './sistema-turnos.component';


@Injectable({
  providedIn: 'root'
})
export class SistemaTurnosService {

  private apiUrl = 'http://localhost:3000/api/v2/sist-turnos'
  private apiUsuarioUrl = 'http://localhost:3000/api/v2/usuario'
  private apiClienteUrl = 'http://localhost:3000/api/v2/cliente/forAdmin'

  constructor() { }

  crearTurno(turno: Turnos): Observable<any> {
    return from(axios.post(this.apiUrl, turno).then(response => response.data));
  }

  obtenerTurno(): Observable<Turnos[]> {
    return from(axios.get(this.apiUrl).then(response => response.data));
  }
  
  obtenerUsuarios(): Observable<Usuario[]> {
    return from(axios.get(this.apiUsuarioUrl).then(response => response.data as Usuario[]));
  }

  obtenerClientes(): Observable<Cliente[]> {
    return from(axios.get(this.apiClienteUrl).then(response => response.data as Cliente[]));
  }
}

