import { Component, OnInit } from '@angular/core';
import { ListadoService } from './listado.service';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../date-format.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, RouterLink],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{

  userId!: number;
  clienteId!: number;
  datosDeCliente: any[] = []
  loader: boolean = false;

  constructor(private readonly servicio: ListadoService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
      this.obtenerClientPorId(this.userId);
    } else {
      console.error('No se encontró userData en el localStorage');
    }
  }

  async obtenerClientPorId(userId: number): Promise<void> {
    try {
      this.loader= true;
      const response = await this.servicio.obtenerClientesById(userId);
      this.datosDeCliente = response; 
      console.log(this.datosDeCliente);
      this.loader= false;
    } catch (error) {
      console.error('No se ha podido obtener datos de clientes: ', error);
      this.loader= false;
    }
  }

  obtenerDatosCliente() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clienteId = parseInt(idParam, 10);
      console.log('Id del cliente: ', this.clienteId);
    }
  }

  async funcionEliminarCliente(clienteId: number){
    try {
      const response = await this.servicio.borrarClientePorId(clienteId, this.userId)
      console.log('Cliente borrado exitosamente: ', response)
      this.obtenerClientPorId(this.userId)
    } catch (error) {
      console.error('Error al borrar cliente', error)
    }
  }
}