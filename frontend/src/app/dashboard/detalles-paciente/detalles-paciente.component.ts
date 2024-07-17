import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallesPacienteService } from './detalles-paciente.service';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../date-format.pipe';
import { ResultadosService } from '../resultados/resultados.service';

@Component({
  selector: 'app-detalles-paciente',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, CommonModule],
  templateUrl: './detalles-paciente.component.html',
  styleUrl: './detalles-paciente.component.css'
})
export class DetallesPacienteComponent implements OnInit {

  userId!: number;
  clienteId!: number;
  datosDeCliente: any= {};
  resultados: any[] = []; 

  constructor(private route: ActivatedRoute, private readonly peticion: DetallesPacienteService,
    private resultadosService: ResultadosService,
  ) { }

  ngOnInit(): void {
    this.recolectarDatos();
  }

  obtenerDatosUsuario() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
      console.log('Id del usuario: ', this.userId);
    }
  }

  obtenerDatosCliente() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.clienteId = parseInt(idParam, 10);
      console.log('Id del cliente: ', this.clienteId);
    }
  }

  recolectarDatos() {
    this.obtenerDatosUsuario();
    this.obtenerDatosCliente();
    this.obtenerClientePorId(this.clienteId, this.userId)
    this.obtenerResultados(this.clienteId)
  }

  async obtenerClientePorId(clienteId: number, userId: number) {
    try {
      const response = await this.peticion.encontrarClienteById(clienteId, userId);
      console.log('Response:', response);
      this.datosDeCliente = response; // Asignamos la respuesta al objeto datosDeCliente
    } catch (error) {
      console.error('Error en .ts: ', error);
    }
  }

  async obtenerResultados(clienteId?: number) {
    try {
      this.resultados = await this.resultadosService.findAllResultados(clienteId);
      console.log('Resutlados por id',this.resultados)
    } catch (error) {
      console.error('Error obteniendo resultados:', error);
      // Manejar el error según sea necesario (por ejemplo, mostrar un mensaje de error en la UI)
    }
  }

  async eliminarResultadoPorId(id:number){
    console.log('Este es el id del resultado a borrrar',id)
    this.peticion.eliminarResultadoPorId(id)
      .then((resonse)=>{
        console.log('resultado eliminado')
        this.obtenerResultados(this.clienteId)
      })
      .catch((error)=>{
        throw new Error('No se ha podido borrar resultado: ', error)
      })
  }
}
