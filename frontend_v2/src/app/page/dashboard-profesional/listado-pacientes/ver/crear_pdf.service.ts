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

  generatePdf(datosDeCliente: any, resultados: any[], valorSumar: number) {
    const docDefinition = {
      content: [
        { text: `Protocolo: ${datosDeCliente.protocolo}`, style: 'header' },
        { text: datosDeCliente.nombre, style: 'subheader' },
        { text: `DNI: ${datosDeCliente.dni}`, style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Fecha de Nacimiento', datosDeCliente.nacimiento],
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
        { text: `Creado el: ${datosDeCliente.createdAt}`, style: 'subheader' },
        { text: 'Resultados', style: 'header', margin: [0, 20, 0, 10] },
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
        { text: `Valor Total: $ ${valorSumar}`, style: 'total' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
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
