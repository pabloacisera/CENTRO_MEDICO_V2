import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DetallesPacienteService {

  url = environment.backendRoute.nuevo
  resultadoUrl = environment.backendResultado.resultado

  constructor() { }

  async encontrarClienteById(clienteId: number, userId: number){
    try {
      const response = await axios.get(`${this.url}/${clienteId}`, {
        params: {
          userId: userId,
        }
      })
      return response.data;
    } catch (error) {
      console.error('Error al obtener cliente: ', error)
    }
  }

  async eliminarResultadoPorId(id: number) {
    try {
      const response = await axios.delete(`${this.resultadoUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el resultado:', error);
      throw new Error(`Error al eliminar el resultado`);
    }
  }
}
