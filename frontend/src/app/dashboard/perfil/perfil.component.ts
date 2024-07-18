import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PerfilService } from './perfil.service';
import { CommonModule } from '@angular/common';
import { Indicaciones } from './indicaciones';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AccordionModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

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

  async obtenerDatosDeUsuario(userId: number){
    this.peticion.obtenerUsuarioById(userId)
    .then((response)=> {
      if (Array.isArray(response)) {
        this.datosDeUsuario = response;
      } else {
        this.datosDeUsuario = [response]; // Convertir objeto a array con un solo elemento
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  funcionSalir() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token')
    this.ruta.navigate(['/principal'])
  }

  /***********************************nuevas indicaciones********************************/
  nuevaIndicacionTitulo: string = '';
  nuevaIndicacionTexto: string = '';

  async crearNuevaIndicacion() {
    // Validar que los campos no estén vacíos
    if (this.nuevaIndicacionTitulo.trim() === '' || this.nuevaIndicacionTexto.trim() === '') {
      alert('Por favor, complete ambos campos para crear una nueva indicación.');
      return;
    }
  
    // Crear nueva indicación
    const nuevaIndicacion = {
      titulo: this.nuevaIndicacionTitulo,
      texto: this.nuevaIndicacionTexto,
      userId: this.userId
    };
  
    // Limpiar los campos después de crear la nueva indicación
    this.nuevaIndicacionTitulo = '';
    this.nuevaIndicacionTexto = '';
  
    try {
      const response = await this.peticion.crearNuevaIndicacion(nuevaIndicacion);
      // Manejar la respuesta si es necesario
      console.log('Respuesta del backend:', response);
  
      // Obtener las indicaciones actualizadas después de crear una nueva
      this.obtenerIndicaciones(this.userId);
    } catch (error) {
      console.error('Error al crear la indicación:', error);
      // Manejar el error de manera apropiada, según tus necesidades
      throw error;
    }
  }
  

  indicacionesBackend: any[] = []

  async obtenerIndicaciones (userId: number) {
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
  
}
