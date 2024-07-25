import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NuevaContraseñaAdminService {

  urlNewPassword = 'http://localhost:3000/api/v2/autenticacion-administrativos/update-password'

  constructor() { }

  nuevaContraseña(id: number, password: string) {
    return axios.patch(`${this.urlNewPassword}/${id}`, {
      password: password
    }).then(response => response.data)
      .catch(error => {
        console.log('Error de axios: ', error);
        throw error;  // Relanza el error para que el componente pueda manejarlo
      });
  }
}
