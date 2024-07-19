import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NuevaFichaService {

  apiUrl = "http://localhost:3000/api/v2/cliente"

  constructor() {}

  async nuevoCliente(cliente: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, cliente);
      return response.data;  // Asegúrate de que la API devuelva datos válidos
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      throw new Error('Error al crear cliente');  // Lanza un error para manejarlo en el componente
    }
  }
}