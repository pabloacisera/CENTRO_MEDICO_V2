import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root',
})
export class Crear_pdfService {

  constructor() {
    this.setVfs();
  }

  private setVfs() {
    const pdfMakeAny = pdfMake as any;
    pdfMakeAny.vfs = pdfFonts.pdfMake.vfs;

    console.log('Available fonts:', Object.keys(pdfMakeAny.vfs));
  }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  generatePdf(datosDeCliente: any, resultados: any[], valorSumar: number) {
    const docDefinition = {
      content: [
        {
          columns: [
            {
              text: 'Institución Médica XYZ',
              style: 'institutionName'
            },
            {
              text: 'Dirección: Calle Falsa 123, Ciudad, País\nTeléfono: +123 456 7890',
              style: 'institutionDetails',
              alignment: 'right'
            }
          ]
        },
        {
          text: `Informe de Resultados`,
          style: 'reportTitle',
          margin: [0, 10, 0, 20]
        },
        {
          text: `Paciente: ${datosDeCliente.nombre}`,
          style: 'patientInfo'
        },
        {
          text: `Protocolo: ${datosDeCliente.protocolo}`,
          style: 'patientInfo',
          margin: [0, 0, 0, 10]
        },
        // Datos del cliente
        {
          style: 'tableExample',
          table: {
            body: [
              ['Fecha de Nacimiento', this.formatDate(datosDeCliente.nacimiento)],
              ['Edad', datosDeCliente.edad],
              ['Teléfono', datosDeCliente.telefono],
              ['Email', datosDeCliente.email],
              ['Dirección', datosDeCliente.direccion],
              ['Localidad', datosDeCliente.localidad],
              ['Seguridad Social', datosDeCliente.seguridadSocial],
              ['Observaciones', datosDeCliente.obs]
            ]
          }
        },
        { text: `Creado el: ${this.formatDate(datosDeCliente.createdAt)}`, style: 'subheader' },
        { text: 'Resultados', style: 'header', margin: [0, 20, 0, 10] },
        // Resultados
        {
          style: 'tableExample',
          table: {
            body: [
              ['Código', 'Determinación', 'Resultado', 'Unidad Base', 'Total U.B'],
              ...resultados.map(resultado => [
                resultado.codigo,
                resultado.determinacion,
                resultado.resultado,
                resultado.unidadBase,
                `$ ${resultado.valorTotal}`
              ])
            ]
          }
        },
        { text: `Valor Total: $ ${valorSumar}`, style: 'total' }
      ],
      styles: {
        institutionName: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0]
        },
        institutionDetails: {
          fontSize: 10,
          margin: [0, 10, 0, 0]
        },
        reportTitle: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        patientInfo: {
          fontSize: 14,
          margin: [0, 0, 0, 5]
        },
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
