import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DashboardPacienteService {

  constructor() { }

  url = "http://localhost:3000/api/v2/usuario"
  indUrl = "http://localhost:3000/api/v2/indicaciones"
  resultadoUrl = "http://localhost:3000/api/v2/resultado"

  async obtenerUsuarioById(userId:number){
    try {
      const response = await axios.get(`${this.url}/${userId}`)
      return response.data;
    } catch (error) {
      console.error('No se puedo obtener datos del usuario', error)
    }
  }

  async obtenerTodosLasIndicaciones(userId: number) {
    try {
      const response = await axios.get(`${this.indUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('No se pudo obtener las indicaciones: ', error);
      throw error;
    }
  }

  async findAllResultados(clienteId?: number) {
    try {
      const url = clienteId ? `${this.resultadoUrl}?clienteId=${clienteId}` : `${this.resultadoUrl}`;
      const response = await axios.get(url); // Ajusta Resultado según la estructura real
      return response.data;
    } catch (error) {
      console.error('Error fetching resultados:', error);
      throw new Error(`Error al obtener los resultados`);
    }
  }

}
