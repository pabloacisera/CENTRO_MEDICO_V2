import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public DatosExtraidos: any[] = []

  constructor() { 
   this.extraerDatos(); 
  }

  extraerDatos() {
    const datos = localStorage.getItem('usuario');
    if (!datos) {
      console.log('No se ha podido extraer el usuario');
    } else {
      try {
        const parsedDatos = JSON.parse(datos);
        this.DatosExtraidos = Array.isArray(parsedDatos) ? parsedDatos : [parsedDatos];
        console.log('Datos extraidos exitosamente: ', this.DatosExtraidos);
      } catch (error) {
        console.log('Error al parsear los datos: ', error);
      }
    }
  }

  funcionSalir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario')
  }
}
