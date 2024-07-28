import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../environment/development';

@Injectable({
  providedIn: 'root'
})
export class ImapflowBandejaCorreosService {

  constructor() { 
  }

  async fetchEmails() {
    try {
      const response = await axios.get('http://localhost:3000/api/v2/imapflow-correos/fetch');
      console.log('Respuesta de Axios:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error en la respuesta del servidor:', error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo sucedió al configurar la solicitud que provocó un error
        console.error('Error en la configuración de la solicitud:', error.message);
      }
      console.error('Error completo:', error.config);
      throw error;
    }
  }
  
}
