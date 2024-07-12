import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { ResultadoServices } from '../../servicios/resultado.service';
import { Resultado } from './interfaceParaResultado'; // Asegúrate de que esta ruta sea correcta
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Cliente } from '../nuevo-cliente/cliente';

@Component({
  selector: 'app-ver-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css'],
})
export class VerClienteComponent implements OnInit {
  public cargando: boolean = false;
  public idCliente: number = 0;
  public clienteObtenido!: Cliente;
  public resultadosObtenidos: Resultado[] = [];
  public valorTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private servicio: ClienteService,
    private servicioResultado: ResultadoServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idCliente = Number(params.get('id'));
      console.log('id del cliente: ', this.idCliente);
      this.cargarDatos();
    });
  }

  async cargarDatos() {
    this.cargando = true;
    try {
      await this.traerClientePorId(this.idCliente);
      await this.traerTodosLosResultadosDelCliente(this.idCliente);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      this.cargando = false;
    }
  }

  async traerClientePorId(id: number) {
    try {
      const response = await this.servicio.obtenerUnId(id);
      this.clienteObtenido = response; // Asumiendo que `response` contiene el cliente completo
      console.log('Datos Obtenidos del cliente', this.clienteObtenido);
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
    }
  }

  async traerTodosLosResultadosDelCliente(idDeCliente: number) {
    try {
      const response = await this.servicioResultado.obtenerLosResultados(
        idDeCliente
      );
      this.resultadosObtenidos = response; // Asumiendo que `response` es un array de resultados
      this.valorTotal = this.resultadosObtenidos.reduce(
        (total, resultado) => total + resultado.valor,
        0
      );
      console.log(
        'Resultados devueltos han sido guardados',
        this.resultadosObtenidos
      );
    } catch (error) {
      console.error('Error al obtener resultados:', error);
    }
  }

  generarPDF() {
    const elementToPrint: any = document.getElementById('theContent');

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]); // Creación correcta del objeto jsPDF con dimensiones del canvas
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.setProperties({
        title: 'Informe Bioquimico',
        subject: 'none',
        author: 'anonimous',
      });
      pdf.setFontSize(12);
      pdf.text('random_dev text', 14, 22);
      pdf.save('informe.pdf');
    });
  }

  rutaCarga(idClienteObtenido: number) {
    this.router.navigate([`/resultado/${idClienteObtenido}`]);
  }
}
