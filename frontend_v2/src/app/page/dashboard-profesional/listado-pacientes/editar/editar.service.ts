import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EditarService {

  url = "http://localhost:3000/api/v2/cliente"

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

  async ActualizarDatosCliente(clienteId: number, updateClienteDto: any, userId: number){
    try {
      const response = await axios.patch(`${this.url}/${clienteId}`, updateClienteDto, {
        params: {
          userId: userId,
        }
      })
      return response.data;
    } catch (error) {
      console.error('Error al actualiar cliente: ', error)
      throw error;
    }
  }
}