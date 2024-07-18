import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardPacienteService {

  private url = environment.backendResultado.resultado

  constructor() { }

  async obtenerTodosLosResultados(clienteId: number) {
    try {
      const response = await axios.get(`${this.url}?clienteId=${clienteId}`);
      return response.data; // Devuelve los datos obtenidos desde Axios
    } catch (error) {
      console.error(`Error al obtener resultados para el cliente con ID ${clienteId}`, error);
      throw error; // Lanza el error para que sea manejado en el componente o donde se llame esta función
    }
  }
}
