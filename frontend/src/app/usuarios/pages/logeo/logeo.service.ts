import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";
import { Logeo } from './logeo';

@Injectable({
  providedIn: "root",
})

export class LogeoService {
  private http: AxiosInstance;
  private url = 'http://localhost:3000/api/v2/usuario/autenticacion';

  constructor() {
    this.http = axios.create();
  }

  async logear(datos: Logeo){
    try {
      const response = await this.http.post(this.url, datos)
      console.log('Datos de axios: ', response.data);
      const { token, data } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}