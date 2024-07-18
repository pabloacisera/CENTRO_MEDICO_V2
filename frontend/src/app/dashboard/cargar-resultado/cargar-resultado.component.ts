import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DetallesPacienteService } from '../detalles-paciente/detalles-paciente.service';
import { CommonModule } from '@angular/common';
import { Nomenclatura } from '../resultados/resultado.interface';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NomenclaturaService } from '../nomenclatura/nomenclatura.service';
import { ResultadosService } from '../resultados/resultados.service';

@Component({
  selector: 'app-cargar-resultado',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cargar-resultado.component.html',
  styleUrl: './cargar-resultado.component.css'
})
export class CargarResultadoComponent implements OnInit{

  clienteId: number = 0;
  datosDeCliente: any= {};
  userId: number = 0
  searchForm: FormGroup;
  resultMessage = '';
  nomenclaturas: Nomenclatura[] = [];
  showResult = false;

  constructor(private readonly route: ActivatedRoute,
    private readonly peticion: DetallesPacienteService,
    private nomenclaturaService: NomenclaturaService,
    private resultadoService: ResultadosService,
    private fb: FormBuilder,
    private ruta: Router
  ){
    this.searchForm = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recolectarFunciones();
  }

  recolectarFunciones(){
    this.obtenerDatosUsuario()
    this.obtenerDatosCliente()
    this.obtenerClientePorId(this.clienteId, this.userId)
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

  async obtenerClientePorId(clienteId: number, userId: number) {
    try {
      const response = await this.peticion.encontrarClienteById(clienteId, userId);
      console.log('Response:', response);
      this.datosDeCliente = response; // Asignamos la respuesta al objeto datosDeCliente
      console.log('Datos guardados: ', this.datosDeCliente)
      console.log(typeof this.datosDeCliente)
    } catch (error) {
      console.error('Error en .ts: ', error);
    }
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
        this.ruta.navigate([`/detalles/${this.clienteId}`])
      })
      .catch(error => {
        console.error('Error al enviar resultados al backend:', error)
      });
  }
}
