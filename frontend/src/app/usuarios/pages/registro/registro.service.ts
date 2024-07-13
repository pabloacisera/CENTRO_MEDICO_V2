import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Registro } from './registro';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private http: AxiosInstance;
  private url = 'http://localhost:3000/api/v2/usuario';

  constructor() {
    this.http = axios.create();
  }

  async crearUsuario(datos: Registro): Promise<Registro> {
    try {
      const res = await this.http.post(this.url, datos);
      console.log('Datos de axios: ', res.data);
      const { token, data } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
