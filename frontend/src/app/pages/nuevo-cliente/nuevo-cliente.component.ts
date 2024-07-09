import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../servicios/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from './cliente'; // Asegúrate de que el path sea correcto
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css', // Corregido el nombre del atributo para referenciar estilos
})
export class NuevoClienteComponent implements OnInit {

  formularioDeCliente: FormGroup;

  constructor(private fb: FormBuilder, private readonly servicio: ClienteService, private ruta: Router) {
    this.formularioDeCliente = this.fb.group({
      protocolo: [''],
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

  public extraerId?: number;

  ngOnInit() {
    const obtenerIdUsuario = localStorage.getItem('usuario');
    if (obtenerIdUsuario) {
      try {
        const usuario = JSON.parse(obtenerIdUsuario);
        this.extraerId = usuario.data.id;
        console.log('Id extraído:', this.extraerId);
      } catch (error) {
        console.error('Error al parsear el usuario de localStorage', error);
      }
    } else {
      console.error('No se encontró usuario en localStorage');
    }
  }

  async crearNuevoCliente() {
    if (this.formularioDeCliente.invalid) {
      console.log('Formulario inválido');
      return;
    }
    
    const usuarioCreado: Cliente = {
      protocolo: this.formularioDeCliente.get('protocolo')?.value,
      nombre: this.formularioDeCliente.get('nombre')?.value,
      dni: this.formularioDeCliente.get('dni')?.value.toString(),
      nacimiento: this.formularioDeCliente.get('nacimiento')?.value,
      edad: this.formularioDeCliente.get('edad')?.value,
      direccion: this.formularioDeCliente.get('direccion')?.value,
      localidad: this.formularioDeCliente.get('localidad')?.value,
      telefono: this.formularioDeCliente.get('telefono')?.value,
      email: this.formularioDeCliente.get('email')?.value,
      seguridadSocial: this.formularioDeCliente.get('seguridadSocial')?.value,
      obs: this.formularioDeCliente.get('obs')?.value,
      userId: this.extraerId || 0 // Usamos || 0 para manejar el caso donde extraerId podría ser undefined
    };

    console.log(usuarioCreado);

    try {
      const response = await this.servicio.crearCliente(usuarioCreado);
      console.log('Datos enviados: ', response);
      // Redireccionar o manejar el éxito
      this.ruta.navigate(['/listado']); // Ajusta la ruta según tu aplicación
    } catch (error) {
      console.log('Error al enviar crear datos', error);
    }
  }
}