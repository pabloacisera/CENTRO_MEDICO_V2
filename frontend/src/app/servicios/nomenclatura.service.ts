import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environmentNomenclatura } from '../environments/environment.developer';

@Injectable({
  providedIn: 'root'
})
export class NomenclaturaService {
  private readonly peticion: AxiosInstance;

  baseUrl = environmentNomenclatura.apiUrl;

  constructor() { 
    this.peticion = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async obtenerTodosLosRegistros(){
    try {
      const respuesta = await this.peticion.get(this.baseUrl);
      return respuesta.data;  // Ensure this returns the actual data object
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
}
