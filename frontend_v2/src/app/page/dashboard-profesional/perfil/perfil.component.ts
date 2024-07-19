import { Component, inject } from '@angular/core';
import { PerfilService } from './perfi.service';
import { Router, RouterLink } from '@angular/router';
import { Indicaciones } from './indicaciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userId!: number;
  datosDeUsuario: any[] = [];
  indicaciones: Indicaciones[] = []

  public ruta = inject(Router)

  constructor(private readonly peticion: PerfilService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
      this.obtenerDatosDeUsuario(this.userId)
      this.obtenerIndicaciones(this.userId);
    }
  }

  async obtenerDatosDeUsuario(userId: number) {
    this.peticion.obtenerUsuarioById(userId)
      .then((response) => {
        if (Array.isArray(response)) {
          this.datosDeUsuario = response;
          console.log('Datos de usuarios: ', this.datosDeUsuario)
        } else {
          this.datosDeUsuario = [response]; // Convertir objeto a array con un solo elemento
          console.log('Datos de usuarios: ', this.datosDeUsuario)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  funcionSalir() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token')
    this.ruta.navigate(['/logear'])
  }

  /***********************************obtener indicaciones********************************/
  indicacionesBackend: any[] = []

  async obtenerIndicaciones(userId: number) {
    try {
      const response = await this.peticion.obtenerTodosLasIndicaciones(userId)
      this.indicacionesBackend = response;
      console.log('Indicaciones obtenidos: ', this.indicacionesBackend)
    } catch (error) {
      console.log(error)
    }
  }

  async onDelete(id: number) {
    try {
      await this.peticion.eliminarIndicacion(id, this.userId);
      console.log(`Indicación con ID ${id} eliminada correctamente.`);
      this.obtenerIndicaciones(this.userId); // Actualiza la lista de indicaciones después de eliminar
    } catch (error) {
      console.error('Error al eliminar la indicación:', error);
      // Manejar el error apropiadamente si es necesario
    }
  }

  /**redireccionar a nueva indicacion */

  routerToNew() {
    this.ruta.navigate([`/nueva-indicac/${this.userId}`])
  }

  irPanelDeControl(){
    this.ruta.navigate(['/dash-prof'])
  }
}
