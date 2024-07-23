import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NuevoPacienteAdminService {

  url = "http://localhost:3000/api/v2/usuario"

  constructor() { }

  async obtenerTodosLosUsuarios() {
    try {
      const response = await axios.get(this.url)
      return response.data
    } catch (error) {
      console.log('Error de axios', error)
      throw new Error('Error de axios al obtener usuarios')
    }
  }
}
