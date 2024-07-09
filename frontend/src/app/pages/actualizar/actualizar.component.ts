import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent implements OnInit {
  idClienteObtenido?: number;
  formularioActualizacion: FormGroup;
  public cargandoFormulario: boolean = false;
  public guardandoFormulario: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicio: ClienteService,
    private ruta: Router
  ) {
    this.formularioActualizacion = this.fb.group({
      protocolo:[''],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      seguridadSocial: ['', Validators.required],
      obs: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idClienteObtenido = +params['id'];
      this.cargarDatosCliente();
    });
  }

  async cargarDatosCliente() {
    this.cargandoFormulario =true;
    try {
      const datosCliente = await this.servicio.obtenerUnId(this.idClienteObtenido!);
      this.formularioActualizacion.patchValue({
        protocolo:datosCliente.protocolo,
        nombre: datosCliente.nombre,
        dni: datosCliente.dni,
        nacimiento: datosCliente.nacimiento,
        edad: datosCliente.edad,
        direccion: datosCliente.direccion,
        localidad: datosCliente.localidad,
        telefono: datosCliente.telefono,
        email: datosCliente.email,
        seguridadSocial: datosCliente.seguridadSocial,
        obs: datosCliente.obs
      })
      this.cargandoFormulario= false;
    } catch (error) {
      console.error('Error al cargar los datos del cliente:', error);
      this.cargandoFormulario=false;
    }
  }

  async onSubmit() {
    this.guardandoFormulario=true;
    if (!this.formularioActualizacion.valid) {
      return alert('El formulario no es válido');
    }
    try {
      await this.servicio.actualizarCliente(this.idClienteObtenido!, this.formularioActualizacion.value);
      alert('Cliente actualizado con éxito');
      this.guardandoFormulario = false;
      this.ruta.navigate(['/listado']);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      alert('Hubo un problema al actualizar el cliente');
      this.guardandoFormulario=false;
    }
  }
}