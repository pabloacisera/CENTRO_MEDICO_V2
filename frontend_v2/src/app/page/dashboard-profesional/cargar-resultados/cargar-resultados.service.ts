import axios from 'axios';
import { Nomenclatura } from './resultado.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CargarResultadosService {

    url = "http://localhost:3000/api/v2/cliente"
    resultadoUrl = "http://localhost:3000/api/v2/resultado"

    constructor() { }

    async obtenerClientesById(userId: number) {
        try {
            const response = await axios.get(`${this.url}?userId=${userId}`)
            return response.data;
        } catch (error) {
            console.log(error)
            throw new Error('No se ha podido obtener lista de clientes')
        }
    }

    async guardarResultados(nomenclaturas: Nomenclatura[]): Promise<void> {
        try {
            const response = await axios.post(`${this.resultadoUrl}`, nomenclaturas);
            console.log('Resultados guardados en el backend:', response.data);
        } catch (error) {
            console.error('Error al guardar resultados:', error);
            throw new Error('Error al guardar resultados');
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