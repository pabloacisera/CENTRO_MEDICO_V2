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

  async obtenerTodosLosRegistros() {
    try {
      const respuesta = await this.peticion.get(this.baseUrl);
      return respuesta.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Error al obtener los registros');
    }
  }

  async buscarPorCodigo(codigo: number) {
    try {
      const response = await axios.get<any>(`${this.baseUrl}/${codigo}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar el código');
    }
  }
}
