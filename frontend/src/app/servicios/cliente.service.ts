import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environmentCliente } from '../environments/environment.developer';
import { Cliente } from '../pages/nuevo-cliente/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly peticion: AxiosInstance;

  private baseUrl = environmentCliente.apirUrl;

  constructor() {
    this.peticion = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async crearCliente(cliente: Cliente) {
    try {
      const response = await this.peticion.post(this.baseUrl, cliente);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud Axios:', error);
      throw error;
    }
  }

  async obtenerTodosLosClientes(userId: number): Promise<{ data: any }> {
    try {
      const respuesta = await this.peticion.get(this.baseUrl, {
        params: { userId },
      });
      console.log(respuesta);
      return respuesta;
    } catch (error) {
      console.error('Error en la solicitud de clientes: ', error);
      throw error;
    }
  }

  async obtenerUnId(id: number) {
    try {
      const respuesta = await this.peticion.get(`${this.baseUrl}/${id}`);
      console.log(respuesta.data)
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener un usuario: ', error);
      throw error;
    }
  }

  async borrarUnCliente(id: number) {
    try {
      const clienteBorrado = await this.peticion.delete(`${this.baseUrl}/${id}`);
      console.log('Se ha borrado el cliente: ', clienteBorrado)
    } catch (error) {
      console.error('No se ha podido borrar el cliente', error)
      throw error;
    }
  }

  async actualizarCliente(id: number, ClienteActualizado: any) {
    try {
      const response = await this.peticion.put(`${this.baseUrl}/${id}`, ClienteActualizado);
      return response.data;
    } catch (error) {
      console.error('Error en la actualización del cliente:', error);
      throw error;
    }
  }
}
