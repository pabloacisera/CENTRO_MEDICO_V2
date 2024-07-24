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

  generatePdf(datosDeCliente: any, resultados: any[], valorSumar: number, userData: any) {
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
          text: 'Informe de Resultados',
          style: 'reportTitle',
          margin: [0, 10, 0, 20]
        },
        {
          columns: [
            {
              width: '50%',
              stack: [
                { text: `Paciente: ${datosDeCliente.nombre}`, style: 'patientInfo' },
                { text: `Protocolo: ${datosDeCliente.protocolo}`, style: 'patientInfo' },
                { text: `Fecha de Nacimiento: ${this.formatDate(datosDeCliente.nacimiento)}`, style: 'patientInfo' },
                { text: `Edad: ${datosDeCliente.edad}`, style: 'patientInfo' },
                { text: `Teléfono: ${datosDeCliente.telefono}`, style: 'patientInfo' }
              ]
            },
            {
              width: '50%',
              stack: [
                { text: `Email: ${datosDeCliente.email}`, style: 'patientInfo' },
                { text: `Dirección: ${datosDeCliente.direccion}`, style: 'patientInfo' },
                { text: `Localidad: ${datosDeCliente.localidad}`, style: 'patientInfo' },
                { text: `Seguridad Social: ${datosDeCliente.seguridadSocial}`, style: 'patientInfo' },
                { text: `Observaciones: ${datosDeCliente.obs}`, style: 'patientInfo' }
              ]
            }
          ],
          margin: [0, 0, 0, 20]
        },
        { text: `Creado el: ${this.formatDate(datosDeCliente.createdAt)}`, style: 'subheader' },
        { text: 'Profesional Interviniente', style: 'header', margin: [0, 20, 0, 10] },
        {
          stack: [
            { text: `Nombre: ${userData.nombre}`, style: 'professionalInfo' },
            { text: `Área: ${userData.area}`, style: 'professionalInfo' },
            { text: `Email: ${userData.email}`, style: 'professionalInfo' }
          ],
          margin: [0, 0, 0, 20]
        },
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
        {
          margin: [0, 20, 0, 0],
          alignment: 'right',
          columns: [
            {
              text: '',
              width: '*'
            },
            {
              text: 'Firma del Profesional',
              style: 'signature',
              alignment: 'center',
              margin: [0, 0, 0, 10]
            }
          ]
        }
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
        professionalInfo: {
          fontSize: 14,
          margin: [0, 0, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        signature: {
          fontSize: 14,
          margin: [0, 40, 0, 0],
          border: [true, true, false, false],
          borderColor: 'black',
          borderWidth: 1
        }
      }
    }
    pdfMake.createPdf(docDefinition).open();
  }
}

