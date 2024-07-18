import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPacienteService } from './dashboard-paciente.service';
import { AccordionModule } from 'primeng/accordion';
import { Indicaciones } from '../../dashboard/perfil/indicaciones';
import { PerfilService } from '../../dashboard/perfil/perfil.service';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CommonModule, AccordionModule, DateFormatPipe],
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css'
})
export class DashboardPacienteComponent implements OnInit {

  constructor(private ruta:Router,
    private servicio:DashboardPacienteService,
    private readonly peticion: PerfilService
  ){}

  clienteId: number = 0
  userId: number = 0
  datosDeCliente: any = {}
  resultados: any[]= []
  sinResultados: boolean = false
  sumarValor: number= 0
  datosDeUsuario: any = {}

  ngOnInit(): void {
    this.lanzarFunciones()
  }

  lanzarFunciones(){
    this.extraerIdCliente()
    this.extraerIdUsuario()
    this.extraerInfoDelCliente()
    this.statusDeResultado()
    this.obtenerResultadosPorId(this.clienteId)
    this.obtenerProfesional(this.userId)
  }

  extraerIdCliente() {
    const userIdCliente = localStorage.getItem('userData');

    if (userIdCliente) {
      const userData = JSON.parse(userIdCliente);
      const id = userData.id;

      this.clienteId = id;
      console.log('Id del cliente', this.clienteId)
    }
  }

  extraerIdUsuario(){
    const idUsuario = localStorage.getItem('userData')
    if(idUsuario) {
      const userData = JSON.parse(idUsuario)
      const id = userData.userId;

      this.userId = id
    }
  }

  extraerInfoDelCliente(){
    const userDataCliente = localStorage.getItem('userData');
    if(userDataCliente){
      const data = JSON.parse(userDataCliente)
      this.datosDeCliente = data;
      console.log('Datos obtenidos: ', this.datosDeCliente)
    }
  }

  statusDeResultado(){
    if(this.resultados.length === 0){
      this.sinResultados= true;
    } else {
      this.sinResultados = false;
    }
  }

  salir(){
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    this.ruta.navigate(['/principal'])
  }

  /****************obtener datos del profesional***************/

  async obtenerProfesional(userId: number){
    try {
      const res = await this.peticion.obtenerUsuarioById(userId)
      this.datosDeUsuario = res
      console.log('Datos de usuario: ', this.datosDeUsuario)
    } catch (error) {
      console.log(error)
    }
  }

  /************************************************************/

  /**************************indicaciones***********************/
  indicacionesBackend: any[] = []

  async obtenerIndicaciones(userId: number) {
    try {
      console.log('Usuario ID:', userId); // Verifica que userId esté correcto
      const response = await this.peticion.obtenerTodosLasIndicaciones(userId);
      this.indicacionesBackend = response;
      console.log('Indicaciones obtenidas:', this.indicacionesBackend); // Verifica qué devuelve el servicio
    } catch (error) {
      console.error('Error al obtener indicaciones:', error);
    }
  }
 

  /************************************************************/

  sumarValorTotal(){
    this.sumarValor = this.resultados.reduce((acc, item)=> acc + item.valorTotal, 0)
  }

  /*****************************obtener resultados del paciente*********************************/

  async obtenerResultadosPorId(id: number) {
    try {
      const resultados = await this.servicio.obtenerTodosLosResultados(id);
      this.resultados = resultados;
      console.log('Info resultado: ', resultados);
      this.statusDeResultado()
      this.sumarValorTotal()
      await this.obtenerIndicaciones(this.userId); 
    } catch (error) {
      console.error('Error al obtener resultados:', error);
      throw new Error('Error al obtener resultados')
    }
  }
}
