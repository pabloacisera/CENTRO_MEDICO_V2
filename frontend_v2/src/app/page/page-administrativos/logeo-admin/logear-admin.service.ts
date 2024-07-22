import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LogearAdminService {

  url = "http://localhost:3000/api/v2/autenticacion-administrativos/login"

  constructor() { }

  async logearAdmin(data: any): Promise<any> {
    try {
      const response = await axios.post(this.url, data);
      console.log('Datos de axios: ', response.data);
      return response.data; // Asegúrate de devolver solo los datos, no el objeto completo
    } catch (error) {
      console.error('Error de axios: ', error);
      throw new Error('Ha ocurrido un error de axios');
    }
  }
  
}
