import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import axios from 'axios';
import { Nomenclatura } from './resultado.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  url = environment.backendRoute.nuevo
  urlresultado = environment.backendResultado.resultado

  constructor() { }

  async obtenerClientesById(userId: number){
    try {
      const response = await axios.get(`${this.url}?userId=${userId}`)
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('No se ha podido obtener lista de clientes')
    }
  }

  async guardarResultados(nomenclaturas: Nomenclatura[]): Promise<void> {
    try {
      const response = await axios.post(`${this.urlresultado}`, nomenclaturas);
      console.log('Resultados guardados en el backend:', response.data);
    } catch (error) {
      console.error('Error al guardar resultados:', error);
      throw new Error('Error al guardar resultados');
    }
  }

  async findAllResultados(clienteId?: number) {
    try {
      const url = clienteId ? `${this.urlresultado}?clienteId=${clienteId}` : `${this.urlresultado}`;
      const response = await axios.get(url); // Ajusta Resultado según la estructura real
      return response.data;
    } catch (error) {
      console.error('Error fetching resultados:', error);
      throw new Error(`Error al obtener los resultados`);
    }
  }
}
