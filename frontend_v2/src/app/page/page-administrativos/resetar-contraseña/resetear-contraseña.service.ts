import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ResetearContraseñaAdminService {

  urlReseteo = 'http://localhost:3000/api/v2/autenticacion-administrativos/reset-password';

  constructor() { }

  async solicitarReseteo(data: { email: string, rol: string }) {
    try {
      const response = await axios.post(this.urlReseteo, data);
      return response.data; // Asegúrate de devolver solo los datos si es necesario
    } catch (error) {
      console.error('Error de axios:', error.message);
      throw new Error('Error de axios: ' + error.message);
    }
  }
}
