import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadoServices } from '../../servicios/resultado.service';
import { NomenclaturaService } from '../../servicios/nomenclatura.service';
import { Resultado } from '../ver-cliente/interfaceParaResultado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  codigo: number = 0;
  resultadosObtenidos: Resultado[] = [];
  valorDeUB: number = 0;
  valorTotal: number = 0;
  idDeCliente: number | null = null;
  error: string = '';
  resultadosGuardados: Resultado[] = [];

  constructor(
    private readonly nomenclaturaService: NomenclaturaService,
    private route: ActivatedRoute,
    private readonly servicioResultado: ResultadoServices,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idDeCliente = Number(params.get('id'));
      if (this.idDeCliente) {
        this.traerTodosLosResultadosDelCliente(this.idDeCliente);
      }
    });
  }

  obtenerValorUb() {
    this.valorDeUB = this.valorDeUB;
  }

  buscarPorCodigo() {
    this.nomenclaturaService
      .buscarPorCodigo(this.codigo)
      .then((response) => {
        const nuevoResultado: Resultado = {
          id: response.id,
          codigo: response.codigo,
          determinacion: response.determinacion,
          unidadBase: response.unidadBase,
          valor: response.unidadBase * this.valorDeUB,
          valorTotal: 0, // Deberías calcular esto después de agregar nuevoResultado
        };

        this.resultadosGuardados.push(nuevoResultado);
        console.log('Datos para enviar: ', this.resultadosGuardados);

        // Calcular el valor total después de agregar el nuevo resultado
        this.valorTotal = this.resultadosGuardados.reduce(
          (total, resultado) => total + resultado.valor,
          0
        );

        this.error = '';
      })
      .catch((error) => {
        this.error =
          error.response?.data?.message || 'Error al buscar el código';
      });
  }
  eliminarDeVistaPrevia(id: number) {
    const index = this.resultadosGuardados.findIndex(
      (resultado) => resultado.id === id
    );

    if (index !== -1) {
      // Elimina el objeto del array resultadosGuardados
      this.resultadosGuardados.splice(index, 1);

      // Recalcula el valor total después de eliminar el objeto
      this.valorTotal = this.resultadosGuardados.reduce(
        (total, resultado) => total + resultado.valor,
        0
      );
    } else {
      console.error(
        `No se encontró ningún objeto con el id ${id} en resultadosGuardados.`
      );
    }
  }

  async guardarResultados() {
    try {
      if (this.idDeCliente && this.resultadosGuardados.length > 0) {
        let resultadosToSend = this.resultadosGuardados.map((resultado) => ({
          clienteId: this.idDeCliente,
          codigo: resultado.codigo,
          determinacion: resultado.determinacion,
          unidadBase: resultado.unidadBase,
          valor: resultado.valor,
          valorTotal: this.valorTotal,
        }));

        await this.servicioResultado.guardarResultados(resultadosToSend);
        this.traerTodosLosResultadosDelCliente(this.idDeCliente)
        console.log('Resultados guardados correctamente.');
      } else {
        console.error('ID de cliente o resultados vacíos.');
      }
    } catch (error) {
      console.error('Error al guardar resultados:', error);
      // Manejar el error según sea necesario
    }
  }

  async traerTodosLosResultadosDelCliente(idDeCliente: number) {
    try {
      const response = await this.servicioResultado.obtenerLosResultados(
        idDeCliente
      );
      this.resultadosObtenidos = response;
      this.valorTotal = this.resultadosObtenidos.reduce(
        (total, resultado) => total + resultado.valor,
        0
      );
      console.log('Resultados devueltos han sido guardados', response);
    } catch (error) {
      console.error('Se ha producido un error al buscar por idCliente', error);
    }
  }

  eliminarDeBaseDeDatos(id: number) {
    this.servicioResultado.eliminarResultado(id)
      .then(() => {
        if (this.idDeCliente !== null) {
          this.traerTodosLosResultadosDelCliente(this.idDeCliente);
        }
        console.log('Se ha eliminado un registro de base de datos');
      })
      .catch((error) => {
        console.log('Se ha generado un error al borrar registro: ', error);
      });
  }
}
