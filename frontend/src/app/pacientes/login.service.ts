import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { AccesoPaciente } from './login/interface.acceso.paciente';
import { environmentIngresoPaciente } from '../environments/environment.developer';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environmentIngresoPaciente.apiUrl;

  private readonly axiosI: AxiosInstance;

  constructor() {
    this.axiosI = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async accesoCliente(paciente: AccesoPaciente) {
    try {
      const res = await this.axiosI.post(this.url, paciente);
      return res.data; // Cambiar de res.data a res.data.data si es necesario
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
