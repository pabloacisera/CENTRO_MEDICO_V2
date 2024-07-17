import { Component, OnInit } from '@angular/core';
import { ListadoService } from '../listado/listado.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NomenclaturaService } from '../nomenclatura/nomenclatura.service';
import { Nomenclatura } from './resultado.interface';
import { ResultadosService } from './resultados.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements OnInit {

  userId!: number;
  datosDeCliente: any[] = [];
  loader = false;
  clienteSeleccionado: any;
  searchText = '';
  filteredData: any[] = [];
  searchForm: FormGroup;
  resultMessage = '';
  nomenclaturas: Nomenclatura[] = [];
  showResult = false;
  clienteId: number = 0
  p: number = 1

  constructor(
    private readonly servicio: ListadoService,
    private formBuilder: FormBuilder,
    private nomenclaturaService: NomenclaturaService,
    private resultadoService: ResultadosService
  ) {
    this.searchForm = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
  }

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
      this.loader = true;
      const response = await this.servicio.obtenerClientesById(userId);
      this.datosDeCliente = response;
      this.filteredData = this.filterData(); // Actualizamos el filtro de datos
    } catch (error) {
      console.error('No se ha podido obtener datos de clientes: ', error);
    } finally {
      this.loader = false;
    }
  }

  funcionSeleccionar(item: any) {
    this.clienteSeleccionado = item;
    this.clienteId = item.id;
  }

  filterData(): any[] {
    if (!this.searchText) {
      return this.datosDeCliente;
    }
    const lowerCaseSearch = this.searchText.toLowerCase();
    return this.datosDeCliente.filter(item =>
      (item.protocolo && item.protocolo.toString().toLowerCase().includes(lowerCaseSearch)) ||
      (item.nombre && item.nombre.toString().toLowerCase().includes(lowerCaseSearch))
    );
  }

  onSearchTextChange(): void {
    this.filteredData = this.filterData();
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const codigo = this.searchForm.value.codigo;
    this.nomenclaturaService.buscarNomenByCodigo(codigo)
      .then((data) => {
        if (!data) {
          this.resultMessage = 'No existe código';
        } else {
          this.resultMessage = '';
          const nuevaNomenclatura: Nomenclatura = {
            codigo: data.codigo,
            determinacion: data.determinacion,
            resultado: 0,
            clienteId: this.clienteId, // Asignamos el clienteId aquí
            unidadBase: data.unidadBase,
            valorTotal: this.calcularValorTotal(data.unidadBase),
          };
          this.nomenclaturas.push(nuevaNomenclatura);
        }
        this.showResult = true;
        console.log(this.nomenclaturas.length); // Check the array length
      })
      .catch((error) => {
        console.error('Error al buscar por código:', error);
        this.resultMessage = 'Error al buscar por código';
        this.showResult = true;
      })
      .finally(() => {
        this.searchForm.reset();
      });
  }

  /*****************************************************/
  valor_unitario: number = 0;

  obtenerValor(valor: string) {
    this.valor_unitario = parseFloat(valor);
    console.log(this.valor_unitario);
  }

  valor_resultado: number = 0;

  actualizarValoresTotales() {
    for (let nomenclatura of this.nomenclaturas) {
      nomenclatura.valorTotal = this.calcularValorTotal(nomenclatura.unidadBase);
    }
  }

  calcularValorTotal(unidadBase: number): number {
    return this.valor_unitario * unidadBase;
  }

  guardarResultado(nomenclatura: Nomenclatura, resultado: string) {
    nomenclatura.resultado = parseFloat(resultado);
    console.log('Guardar resultado:', nomenclatura);
  }

  guardarResultados() {
    console.log('Todos los datos a enviar al backend:');
    for (let nomenclatura of this.nomenclaturas) {
      console.log(nomenclatura);
      this.guardarResultado(nomenclatura, nomenclatura.resultado.toString());
    }
    this.resultadoService.guardarResultados(this.nomenclaturas)
      .then(() => {
        console.log('Todos los resultados han sido enviados al backend.');
        // Puedes realizar otras acciones después de enviar los resultados, como limpiar el array nomenclaturas
      })
      .catch(error => {
        console.error('Error al enviar resultados al backend:', error)
      });
  }
}
