import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";
import { Cliente } from "./nuevoCliente";
import { HttpFeatureKind } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http: AxiosInstance;
  private url = 'http://localhost:3000/api/v2/cliente';

  constructor() {
    this.http = axios.create();
  }

  createCliente(cliente: Cliente): Promise<Cliente> {
    return this.http.post<Cliente>(this.url, cliente)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al crear cliente:', error);
        throw error;
      });
  }
}