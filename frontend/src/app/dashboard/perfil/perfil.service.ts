import { Injectable } from '@angular/core';
import axios from 'axios'
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url = environment.backendRouteUsuario.usuario;

  constructor() { }

  async obtenerUsuarioById(id:number){
    try {
      const response = await axios.get(`${this.url}/${id}`)
      return response.data;
    } catch (error) {
      console.error('No se puedo obtener datos del usuario', error)
    }
  }
}
