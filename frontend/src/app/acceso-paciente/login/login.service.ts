import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.backend_ingreso_paciente.ingreso_paciente

  constructor() { }

  async ingreso(data: any): Promise<any> {
    try {
      const response = await axios.post(this.url, data);
      return response.data; // Retorna los datos de respuesta del servidor
    } catch (error) {
      console.error('Error al realizar la petición de ingreso:', error);
      throw error; // Propaga el error para que el componente lo maneje
    }
  }
}
