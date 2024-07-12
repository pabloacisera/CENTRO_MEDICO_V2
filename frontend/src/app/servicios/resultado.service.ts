import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { environmentsResultado } from '../environments/environment.developer';

@Injectable({
  providedIn: 'root',
})
export class ResultadoServices {
  private baseUrl = environmentsResultado.apiUrl;
  private readonly peticionResultado: AxiosInstance;

  constructor() {
    this.peticionResultado = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async guardarResultados( Resultado: any): Promise<any> {
    try {
      const response = await this.peticionResultado.post(
        this.baseUrl,
        Resultado,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        'Error guardando resultados:',
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  }

  async obtenerLosResultados(idCliente: number) {
    try {
      const response = await this.peticionResultado.get(
        `${this.baseUrl}?clienteId=${idCliente}`
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo resultados:', error);
      throw new Error('No se pudo obtener los resultados');
    }
  }

  async obtenerUnResultado(id: number) {
    try {
      const response = await this.peticionResultado.get(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error obteniendo resultado:', error);
      throw new Error('No se pudo obtener el resultado');
    }
  }

  async eliminarResultado(id: number) {
    try {
      const response = await this.peticionResultado.delete(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error eliminando resultado:', error);
      throw new Error('No se pudo eliminar el resultado');
    }
  }
}
