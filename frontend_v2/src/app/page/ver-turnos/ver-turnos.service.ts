import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/development';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VerTurnosService {

  private turnoBaseUrl = environment.urlTurnos
  private clienteBaseUrl = environment.urlCliente

  constructor(private http: HttpClient) { }

  obtenerTurnoByUserId(userId: number): Promise<any> {
    return axios.get(`${this.turnoBaseUrl}/${userId}/mis_turnos`);
  }

  async getClientsByIds(ids: number[]): Promise<any[]> {
    const response = await axios.post(`${this.clienteBaseUrl}/find-by-ids`, { ids });
    return response.data;
  }
}

