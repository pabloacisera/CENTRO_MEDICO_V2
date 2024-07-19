import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ListadoPacientesService{

  url = "http://localhost:3000/api/v2/cliente"

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

  async borrarClientePorId(clienteId: number, userId: number){
    try {
      const response = await axios.delete(`${this.url}/${clienteId}`, {
        params: {
          userId: userId,
        }
      })
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener un cliente por id')
    }
  }
}