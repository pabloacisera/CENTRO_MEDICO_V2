import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css'
})
export class DashboardPacienteComponent implements OnInit {

  constructor(private ruta:Router){}

  clienteId: number = 0;
  datosDeCliente: any = {}
  resultados: any[]= []
  sinResultados: boolean = false;

  ngOnInit(): void {
    this.lanzarFunciones()
  }

  lanzarFunciones(){
    this.extraerIdCliente()
    this.extraerInfoDelCliente()
    this.statusDeResultado()
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
}
