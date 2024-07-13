import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private http: AxiosInstance;
  private url = 'http://localhost:3000/api/v2/usuario';

  constructor() {
    this.http = axios.create();
  }

  async obtenerUsuarioById(idUsuario: number) {
    try {
      const response = await this.http.get(`${this.url}/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerUsuarioById:', error);
      throw error;
    }
  }
}
