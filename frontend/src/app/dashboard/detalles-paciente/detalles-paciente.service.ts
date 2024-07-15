import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DetallesPacienteService {

  url = environment.backendRoute.nuevo

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
}
