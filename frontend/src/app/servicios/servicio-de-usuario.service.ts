import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environemntRegistro } from '../environments/environment.developer';
import { InterfazDeUsuario } from '../usuario/interfaz-de-usuario';
import { DatosDeLogeo } from '../usuario/interfaz-de-logeo';


@Injectable({
  providedIn: 'root'
})
export class ServicioDeUsuarioService {

  private readonly peticion: AxiosInstance;
  baseURL = environemntRegistro.apiUrl;

  constructor() { 
    this.peticion = axios.create({
      baseURL: this.baseURL
    })
  }

  async crearUsuario(data: InterfazDeUsuario): Promise<InterfazDeUsuario>{
    try {
      const response = await this.peticion.post(`${this.baseURL}`,data);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear usuario')
    }  
  }

  async logearUsuario(data: DatosDeLogeo): Promise<DatosDeLogeo> {
    try {
      const response = await this.peticion.post(`${this.baseURL}/autenticacion`,data)
      return response.data;
    } catch (error) {
      throw new Error('Error al logear usuario')
    }
  }
}