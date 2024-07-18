import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CargarService {

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
